import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import withRoot from "../withRoot";

import theme from "../styles/theme";
import globals from "../styles/globals";
import { graphql, useStaticQuery } from "gatsby";

import { setFontSizeIncrease, setIsWideScreen } from "../state/store";

import asyncComponent from "../components/common/AsyncComponent/";
import Loading from "../components/common/Loading/";
import Navigator from "../components/Navigator/";
import ActionsBar from "../components/ActionsBar/";
import InfoBar from "../components/InfoBar/";
import LayoutWrapper from "../components/LayoutWrapper/";

import { isWideScreen, timeoutThrottlerHandler } from "../utils/helpers";

const InfoBox = asyncComponent(
  () =>
    import("../components/InfoBox/")
      .then((module) => {
        return module;
      })
      .catch((error) => { }),
  <Loading
    overrides={{ width: `${theme.info.sizes.width}px`, height: "100vh", right: "auto" }}
    afterRight={true}
  />,
);

class Layout extends React.Component {
  timeouts = {};
  categories = [];
  data = {};
  componentDidMount() {
    this.props.setIsWideScreen(isWideScreen());
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeThrottler, false);
    }
    this.data = useStaticQuery(query);
  }

  componentWillMount() {
    if (typeof localStorage !== "undefined") {
      const inLocal = +localStorage.getItem("font-size-increase");

      const inStore = this.props.fontSizeIncrease;

      if (inLocal && inLocal !== inStore && inLocal >= 1 && inLocal <= 1.5) {
        this.props.setFontSizeIncrease(inLocal);
      }
    }

    this.getCategories();
  }

  getCategories = () => {
    this.categories = this.props.data.posts.edges.reduce((list, edge, i) => {
      const category = edge.node.frontmatter.category;
      if (category && !~list.indexOf(category)) {
        return list.concat(edge.node.frontmatter.category);
      } else {
        return list;
      }
    }, []);
  };

  resizeThrottler = () => {
    return timeoutThrottlerHandler(this.timeouts, "resize", 500, this.resizeHandler);
  };

  resizeHandler = () => {
    this.props.setIsWideScreen(isWideScreen());
  };

  render() {
    const { children } = this.props;
    const data = this.data;
    // TODO: dynamic management of tabindexes for keybord navigation
    return (
      <LayoutWrapper>
        {children()}
        <Navigator posts={data.posts.edges} />
        <ActionsBar categories={this.categories} />
        <InfoBar pages={data.pages.edges} parts={data.parts.edges} />
        {this.props.isWideScreen && <InfoBox pages={data.pages.edges} parts={data.parts.edges} />}
      </LayoutWrapper>
    );
  }
}

Layout.propTypes = {
  data: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  setIsWideScreen: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  fontSizeIncrease: PropTypes.number.isRequired,
  setFontSizeIncrease: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    pages: state.pages,
    isWideScreen: state.isWideScreen,
    fontSizeIncrease: state.fontSizeIncrease,
  };
};

const mapDispatchToProps = {
  setIsWideScreen,
  setFontSizeIncrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(injectSheet(globals)(Layout)));

//eslint-disable-next-line no-undef
const query = graphql`query LayoutQuery {
  posts: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "//posts//"}}
    sort: {fields: {prefix: DESC}}
  ) {
    edges {
      node {
        excerpt
        fields {
          slug
          prefix
        }
        frontmatter {
          title
          subTitle
          category
          cover {
            children {
              ... on ImageSharp {
                fluid(maxWidth: 90, maxHeight: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
  pages: allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "//pages//"}, fields: {prefix: {regex: "/^\\d+$/"}}}
    sort: {fields: {prefix: ASC}}
  ) {
    edges {
      node {
        fields {
          slug
          prefix
        }
        frontmatter {
          title
          menuTitle
        }
      }
    }
  }
  parts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "//parts//"}}) {
    edges {
      node {
        html
        frontmatter {
          title
        }
      }
    }
  }
}`;
