import React from "react";
import PropTypes from "prop-types";

import Main from "../components/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";
// import Search from "../components/Search";
import { graphql } from "gatsby";

const SearchPage = props => {
  const { data } = props;

  return (
    <Main>
      <Article>
        <PageHeader title="Search by" algolia={true} />
      </Article>
    </Main>
  );
};

SearchPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default SearchPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query AlgoliaQuery {
    site {
      siteMetadata {
        algolia {
          appId
          searchOnlyApiKey
          indexName
        }
      }
    }
  }
`;
