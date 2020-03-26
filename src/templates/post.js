import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Helmet from "react-helmet"

import { Layout } from "../components/common"
import { MetaData } from "../components/common/meta"
import { chartParser } from "../utils/parser"

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
  const post = data.ghostPost
  const content = chartParser(post.html)
  console.log(content)
  return (
    <>
      <MetaData data={data} location={location} type="article" />
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout>
        <div className="container">
          <h1 className="content-title">{post.title}</h1>

          {content.map(({ type, html, iframeUrl }) => {
            if (type === "chart") {
              return (
                <iframe
                  width="720px"
                  height="480px"
                  className="chart_embed"
                  src={iframeUrl}
                  frameborder="0"
                ></iframe>
              )
            } else {
              return (
                <p
                  className="content-text"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              )
            }
          })}
        </div>
      </Layout>
    </>
  )
}

Post.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
  }
`
