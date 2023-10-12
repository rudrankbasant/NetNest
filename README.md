# NetNest
![image](https://github.com/rudrankbasant/NetNest/assets/85751479/8484eefc-756f-4a0e-9187-11b9fcbd6774)


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#deployment">Deployment</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#local-run">Local Run</a></li>
        <li><a href="#docker-run">Docker Run</a></li>
      </ul>
    </li>
    <li><a href="#design-document">Design Document</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



## About The Project

A social media backend application supported by JWT Authentication, with features to perform requests to follow, unfollow, CRUD operations with posts, likes, comments etc. Built with Typescript and Node.js, with PostgreSQL database and Prisma ORM.


### Built With

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
- ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Microsoft Azure](https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white)


## Getting Started

### Prerequisites

- Install [Node.js and npm](https://nodejs.org/en/download/)
- Install [PostgreSQL](https://www.postgresql.org/download/)

### Setup

- Clone the repo

  ```sh
  git clone https://github.com/rudrankbasant/NetNest
  ```

- Change into the directory

  ```shell
  cd NetNest
  ```

- **Environment Variables**

  ```sh
  touch .env
  ```

  **To run this project successfully you'll need to create a `.env` file and store your PostgreSQL there like [`.env.sample`](https://github.com/rudrankbasant/NetNest/blob/main/.env.sample).**

<!-- USAGE EXAMPLES -->


## Usage

### Local Run

Install NPM packages

```sh
npm i
```

Build the app

```sh
npm run build
```

Start the app

```sh
npm start
```
Now, may access the app on http://localhost:PORT

PORT: You must have already specified in the .env file (8000 by default)

### Docker Run

```dh
docker-compose up --build -d
```

Now, may access the app on http://localhost:80


## Contributing

Contributions make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Developer

<table>
	<tr align="center">
		<td>
		Rudrank Basant
		<p align="center">
			<img src = "https://avatars.githubusercontent.com/u/85751479?v=4" width="150" height="150" alt="Rudrank Basant">
		</p>
			<p align="center">
				<a href = "https://github.com/rudrankbasant">
					<img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36" alt="GitHub"/>
				</a>
				<a href = "https://www.linkedin.com/in/rudrankbasant/">
					<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
				</a>
			</p>
		</td>
	</tr>
</table>


