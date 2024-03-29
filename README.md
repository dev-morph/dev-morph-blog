# [morph-dev Tech Blog](https://morph-dev.com/)&nbsp;&nbsp;<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>

This is a Tech Blog Project using NextJS [(https://morph-dev.com/)](https://morph-dev.com/)(**still in Development**)  

![Blog-Welcome Page](https://github.com/dev-morph/dev-morph-blog/assets/112484043/8292dab6-845b-4672-b9dd-57d7f4d29ec2)

I strived to write code based on below priciples or to achieve features.  

-   [**Easy to Upload Post**](#easy-to-upload-post): It has to be easy to upload Post with several pictures.
-   [**Clean-Code**](#cleancode): Wrote code as cleanly as possible based on my experience, even if it is not perfect.
-   [**Responsive Web Design**](#responsive-web-design): My blog is designed to be responsive on both web and mobile platforms.
-   [**CI/CD**](#cicd): Established simple CI/CD pipeline using AWS EC2 for development convenience.

#

## Easy to Upload Post
When uploading posts with pictures, convenience is key. To achieve that, I've designed a **custom post form** as shown below. What makes it especially user-friendly is the seamless file upload and deletion process.
![write-post](https://github.com/dev-morph/dev-morph-blog/assets/112484043/1f1b5676-6e8b-4d91-8ba8-a63b7e708d4c)


#

## CleanCode?

I tried to **expose the core logic** and **abstract unnecessary internal details**.
My React Code style looks like the following.
You can check [morphlib](https://github.com/dev-morph/dev-morph-blog/tree/main/morph-lib/components) of this project to see how I design and manage React components for clean code.

```html
    <>
        <Card
            href={linkPath}
            image={
                <Card.Image
                    imagePath={imagePath}
                    title={title}
                    width={350}
                    height={250}
                    hoverText={excerpt}
                />
            }
            description={
                <Card.Description title={title} creatTime={formattedDate} />
            }
        />
    </>
```

#

#

## Responsive Web Design

My blog is designed to be responsive on both web and mobile platforms.
The following picture shows how my website looks on a mobile platform.

<p align="center">
    <img width="409" alt="image" src="https://github.com/dev-morph/dev-morph-blog/assets/112484043/25a39890-e525-4345-8c43-661133232126">
</p>

#

#

## CI/CD
Currently, this project uses the FileSystem to manage posts temporarily. Consequently, every time I write a new post, I have to redeploy the project. This involves connecting to EC2, pulling the new code, building it, and deploying it again. This process is not only annoying but also time-consuming. To streamline this, I've integrated GitHub Actions into the workflow, eliminating the need for manual deployment tasks.

As I only want to deploy when I decide it's ready, the workflow is triggered manually using GitHub CLI commands (action.sh). By leveraging GitHub Actions and creating a simple shell script, I've significantly increased productivity.

The current workflow is straightforward. For detailed information on establishing CI/CD pipelines, please refer to a previous post I've written..[**CI/CD with nginx and Docker**](https://marklee1117.tistory.com/168)
#  
