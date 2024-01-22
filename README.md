# [morph-dev Tech Blog](https://morph-dev.com/)

This is a Tech Blog Project using NextJS [(https://morph-dev.com/)](https://morph-dev.com/)
I strived to write code based on below priciples

-   [**Clean-Code**](#cleancode): Wrote code as cleanly as possible based on my experience, even if it is not perfect.
-   [**Responsive Web Design**](#responsive-web-design): My blog is designed to be responsive on both web and mobile platforms.
-   [**HTTPS**](#https) Used a SSL certificate to secure the HTTPS connection.

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
    <img width="405" alt="image" src="https://github.com/dev-morph/dev-morph-blog/assets/112484043/c3a60646-c45e-452a-8816-602ef3905bbc">
</p>

## HTTPS

Most of Browsers such as Chrome mark all HTTP websites as "Not Secure". To remove this mark and enhance the security of my website, I used a SSL certificate for the HTTPS connection.  
I used Certbot to issue a SSL certifiacte for my website. It is free and very easy to use.
