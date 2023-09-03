import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
import { selectFields } from 'express-validator/src/field-selection';

const prisma = new PrismaClient();

export interface ARequest extends Request {
    user: User;
}

export async function getUser(req: ARequest, res: Response) {
    try {
        const username = req.params.username;

        if (username !== req.user.username) {
            return res.status(403).json({ message: 'You do not have permission to view this user' });
        }

        const user = await prisma.user.findUnique({
            where: { username: username },
            select: {
                id: true,
                username: true,
                email: true,
                password: false, 
                profilePicture: true,
                isPrivate: true,
                isAdmin: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
};

export async function deleteUser(req: ARequest, res: Response) {
    try {
        const username = req.params.username;

        if (username !== req.user.username) {
            return res.status(403).json({ message: 'You do not have permission to delete this user' });
        }

        const existingUser = await prisma.user.findUnique({ where: { username: username } });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const deletedUser = await prisma.user.delete({ where: { username: username } });

        return res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
};


export async function updateUser(req: ARequest, res: Response) {
  try {
    const userId = parseInt(req.params.id, 10); 

    if (userId !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to update this user' });
    }

    const existingUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
        isPrivate: req.body.isPrivate,
        isAdmin: req.body.isAdmin,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}


export async function getAllUsers(req: ARequest, res: Response) {
    try {
        const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            password: false, 
            profilePicture: true,
            isPrivate: true,
            isAdmin: true
        }
        });
    
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
    }

export async function followUser(req: ARequest, res: Response) {
    console.log("followUser");
    try {
        const username = req.params.username;

        if (username === req.user.username) {
            return res.status(403).json({ message: 'You cannot follow/unfollow yourself.' });
        }

        const targetUser = await prisma.user.findUnique({ where: { username: username} });

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentUser = await prisma.user.findUnique({ where: { id: req.user.id },
        include: {
            following: true,
            followers: true
        }});

        if(!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isFollowing = currentUser.following.some((followedUser) => followedUser.username === username);

        if (isFollowing) {
            return res.status(200).json({
                message: 'You are already following this user.',
                followers: currentUser.followers,
                followings: currentUser.following,
            });
        }

        await prisma.user.update({
            where: { id: req.user.id },
            data: {
                following: {
                    connect: {
                        username: username
                    }
                }
            },
        },);

        return res.status(200).json({
            message: 'You are now following the user.',
            followers: currentUser.followers,
            followings: [...currentUser.following, targetUser],
        });

    } catch (error) {
        console.error('Error following user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
}

export async function unfollowUser(req: ARequest, res: Response) {
    try {
        const username = req.params.username;

        if (username === req.user.username) {
            return res.status(403).json({ message: 'You cannot follow/unfollow yourself.' });
        }

        const targetUser = await prisma.user.findUnique({ where: { username: username} });

        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentUser = await prisma.user.findUnique({ where: { id: req.user.id },
        include: {
            following: true,
            followers: true
        }});

        if(!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isFollowing = currentUser.following.some((followedUser) => followedUser.username === username);

        if (!isFollowing) {
            return res.status(200).json({
                message: 'You are not following this user.',
                followers: currentUser.followers,
                followings: currentUser.following,
            });
        }

        await prisma.user.update({
            where: { id: req.user.id },
            data: {
                following: {
                    disconnect: {
                        username: username
                    }
                }
            },
        },);

    

        return res.status(200).json({
            message: 'You are no longer following the user.',
            followers: currentUser.followers,
            followings: currentUser.following.filter((followedUser) => followedUser.username !== username),
        });

    } catch (error) {
        console.error('Error unfollowing user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
}