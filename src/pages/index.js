import React from "react";
import { connect } from "react-redux";
import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { featureNavigator } from "../utils/shared";
import Seo from "../components/Seo";
import { graphql } from "gatsby";
class Index extends React.Component {
  featureNavigator = featureNavigator.bind(this);

  componentDidMount() {
    if (this.props.navigatorPosition !== "is-featured") {
      this.props.setNavigatorPosition("is-featured");
    }
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen,
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
