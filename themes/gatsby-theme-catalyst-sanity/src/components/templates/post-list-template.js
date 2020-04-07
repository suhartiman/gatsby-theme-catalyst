/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import { SEO, Layout } from "gatsby-theme-catalyst-core"
import {
  SanityContent,
  useSanityConfig,
  SanityThemeProvider,
} from "gatsby-theme-catalyst-sanity"

const PostsTemplate = ({ data }) => {
  const posts = data.allSanityPost.nodes
  const { sanityPostPath } = useSanityConfig()
  const rootPath = sanityPostPath.replace(/\/*$/, `/`) //Ensure trailing slash

  return (
    <SanityThemeProvider>
      <Layout>
        <SEO title="Posts" />
        <Styled.h1>Posts</Styled.h1>
        {posts.map((post) => (
          <article sx={{ mb: 5 }} key={post.id}>
            <Styled.a
              as={Link}
              to={rootPath.concat(post.slug.current.replace(/\/*$/, `/`))}
            >
              <Styled.h2>{post.title}</Styled.h2>
            </Styled.a>
            <Styled.p>
              <Styled.a
                href={post.author.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.author.name}
              </Styled.a>{" "}
              &bull; {post.date}
            </Styled.p>
            <SanityContent data={post._rawExcerpt} />
            <Styled.a
              as={Link}
              to={rootPath.concat(post.slug.current.replace(/\/*$/, `/`))}
            >
              Read More
            </Styled.a>
          </article>
        ))}
      </Layout>
    </SanityThemeProvider>
  )
}

export default PostsTemplate
