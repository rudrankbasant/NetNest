import { Request, Response } from "express";
import { prisma } from "../client/client";
import { User } from "@prisma/client";

export interface ARequest extends Request {
    user: User;
}

export async function createPost(req: ARequest, res: Response) {
    const { caption, location } = req.body;

    try {
        const newPost = await prisma.post.create({
            data: {
                caption,
                location,
                author: {
                    connect: {
                        id: req.user.id
                    }
                }
            },
        });

        return res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deletePost(req: ARequest, res: Response) {
    try {
        const { postId } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(postId)
            },
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.authorId !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to delete this post' });
        }

        const deletedPost = await prisma.post.delete({
            where: {
                id: parseInt(postId)
            },
        });

        return res.status(200).json(
            {
                message: 'Post deleted successfully',
                post: deletedPost
            }
        );  
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updatePost(req: ARequest, res: Response) {
    try {
        const { postId } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(postId)
            },
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.authorId !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to update this post' });
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: parseInt(postId)
            },
            data: {
                caption: req.body.caption,
                location: req.body.location,
            },
        });

        return res.status(200).json(
            {
                message: 'Post updated successfully',
                post: updatedPost
            }
        );

    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getPostById(req: ARequest, res: Response) {
    try {
        const { postId } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(postId)
            },
            include: {
                likes: true,
                comments:true
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error('Error getting post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getSelfPosts(req: ARequest, res: Response) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: req.user.id
            },
        });

        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error getting posts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getTimelinePosts(req: ARequest, res: Response) {
    try {
        const user = await prisma.user.findUnique({
            where: {
              id: req.user.id,
            },
            include: {
              following: {
                select: {
                  id: true, 
                },
              },
            },
          });

          if (!user) {
            throw new Error('User not found');
          }

          const followedUserIds = user.following.map((followedUser) => followedUser.id);


          const timeLineUserIds = [...followedUserIds, req.user.id];
          const timelinePosts = await prisma.post.findMany({
            where: {
              authorId: {
                in: timeLineUserIds, 
              },
            },
            include: {
              author: true,
              likes: true,
              comments: true, 
            },
          });

            return res.status(200).json(timelinePosts);

    } catch (error) {
        console.error('Error getting posts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }    
}

export async function likePost(req: ARequest, res: Response) {
    try{
        const { postId } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(postId)
            },
            include: {
                likes: true
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const isLiked = post.likes.some((like) => like.id === req.user.id);

        if (isLiked) {
            
            await prisma.post.update({
                where: { id: parseInt(postId) },
                data: {
                    likes: {
                        disconnect: {
                            id: req.user.id
                        }
                    }
                },
            });

            return res.status(200).json({
                message: 'You unliked the post.',
                likes: post.likes.filter((like) => like.id !== req.user.id),
            });
        }else{
            await prisma.post.update({
                where: { id: parseInt(postId) },
                data: {
                    likes: {
                        connect: {
                            id: req.user.id
                        }
                    }
                },
            });

            return res.status(200).json({
                message: 'You liked the post.',
                likes: [...post.likes, { id: req.user.id }],
            });
        }

    }catch(error){
        console.error('Error liking post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

