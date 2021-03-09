import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import config from "../../../content/meta/config";

import GithubIcon from "!svg-react-loader!../../images/svg-icons/github.svg?name=GithubIcon";
import FacebookIcon from "!svg-react-loader!../../images/svg-icons/facebook.svg?name=FacebookIcon";
import TwitterIcon from "!svg-react-loader!../../images/svg-icons/twitter.svg?name=TwitterIcon";

import LinkedinIcon from "!svg-react-loader!../../images/svg-icons/linkedin.svg?name=LinkedinIcon";
import EmailIcon from "!svg-react-loader!../../images/svg-icons/email.svg?name=EmailIcon";
import MediumIcon from "!svg-react-loader!../../images/svg-icons/medium.svg?name=MediumIcon";
import QuoraIcon from "!svg-react-loader!../../images/svg-icons/quora.svg?name=QuoraIcon";



const styles = theme => ({
  social: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  svg: {
    width: "20px",
    height: "20px",
    fill: theme.info.colors.socialIcons,
    transition: "all .5s"
  },

  // link: {
  //   display: "inline-block",
  //   padding: "5px",
  //   "&:hover": {
  //     "& svg": {
  //       fill: theme.info.colors.socialIconsHover
  //     }
  //   }

  // }
  link: {
    display: "block",
    padding: "12px",
    "&[title='github']": {
      "& svg": {
        fill: "#181717"

      }
    },

    "&[title='twitter']": {
      "& svg": {
        fill: "#01acee"
      }
    },
    "&[title='facebook']:hover": {
      "& svg": {
        fill: "#3c5898"
      }
    },
    "&[title='linkedin']": {
      "& svg": {
        fill: "#007fb1"
      }
    },
    "&[title='email']": {
      "& svg": {
        fill: "#dc4e41"
      }
    },
    "&[title='medium']:hover": {
      "& svg": {
        fill: "#000000"
      }
    },
    "&[title='quora']:hover": {
      "& svg": {
        fill: "#b92b27",

      }
    }
  }

});

const Socialcons = props => {
  const { classes } = props;
  const items = config.authorSocialLinks;
  const icons = {
    twitter: TwitterIcon,
    facebook: FacebookIcon,
    github: GithubIcon,
    email: EmailIcon,
    medium: MediumIcon,
    linkedin: LinkedinIcon,
    quora: QuoraIcon
  };

  return (
    <div className={classes.social}>
      {items.map(item => {
        const Icon = icons[item.name];
        return (
          <a
            href={item.url}
            key={item.name}
            className={classes.link}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
          >
            <Icon className={classes.svg} />
          </a>
        );
      })}
    </div>
  );
};

Socialcons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Socialcons);
