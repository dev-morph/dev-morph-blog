# [morph-dev Tech Blog](https://morph-dev.com/) \* <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>

This is a Tech Blog Project using NextJS [(https://morph-dev.com/)](https://morph-dev.com/)
I strived to write code based on below priciples

-   [**Clean-Code**](#cleancode): Wrote code as cleanly as possible based on my experience, even if it is not perfect.
-   [**Responsive Web Design**](#responsive-web-design): My blog is designed to be responsive on both web and mobile platforms.
-   [**HTTPS**](#https): Used a SSL certificate to secure the HTTPS connection.

## CleanCode?

I tried to **expose the core logic** and **abstract unnecessary internal details**.
My React Code style looks like the following.
You can check [morphlib](https://github.com/dev-morph/dev-morph-blog/tree/main/morph-lib/components) of this project to see how I design and manage React components for clean code.
or my blog post about [how I write clean code](https://marklee1117.tistory.com/176)

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

## Responsive Web Design

My blog is designed to be responsive on both web and mobile platforms.
The following picture shows how my website looks on a mobile platform.

<p align="center">
    <img width="409" alt="image" src="https://github.com/dev-morph/dev-morph-blog/assets/112484043/25a39890-e525-4345-8c43-661133232126">
</p>

## HTTPS

Most of Browsers such as Chrome mark all HTTP websites as "Not Secure". To remove this mark and enhance the security of my website, I used a SSL certificate for the HTTPS connection.  
I used **Certbot** to issue a SSL certifiacte for my website. It is free and very easy to use.
