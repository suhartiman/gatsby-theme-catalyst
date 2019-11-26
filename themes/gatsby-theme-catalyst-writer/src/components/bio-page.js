/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useSanityConfig } from "./sanity/use-sanity-config"
import Img from "gatsby-image"
import PortableText from "@sanity/block-content-to-react"
import serializers from "./sanity/serializers"

const BioPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allSanityBioPage(sort: { fields: _updatedAt, order: DESC }, limit: 1) {
        nodes {
          title
          _rawBody
          topimage {
            alt
            asset {
              fluid(maxHeight: 200) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  `)

  const pageData = data.allSanityBioPage.nodes
  const sanityConfig = useSanityConfig()

  return (
    <Fragment>
      {pageData.map(page => (
        <Fragment key={page.title}>
          <Img
            sx={{
              height: ["150px", "200px", null, null, null],
            }}
            fluid={page.topimage.asset.fluid}
            alt={page.topimage.alt}
          />
          <Styled.h1>{page.title}</Styled.h1>
          <PortableText
            blocks={page._rawBody}
            serializers={serializers}
            {...sanityConfig}
          />
        </Fragment>
      ))}
    </Fragment>
  )
}

export default BioPage