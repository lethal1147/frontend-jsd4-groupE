import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebook, faInstagram, faTwitter } from '@fortawesome/fontawesome-free-brands';
import "../assets/styles/layoutCSS/footer.css";

const socialMediaLinks = [
    { icon: faDiscord, url: "https://discord.com/" },
    { icon: faFacebook, url: "https://www.facebook.com/" },
    { icon: faInstagram, url: "https://www.instagram.com/" },
    { icon: faTwitter, url: "https://twitter.com/" }
];

const Footer = () => (
    <footer className="footer">
        <div className="footer-contact">
            <h4>CONTACT</h4>
            <span>02-222-2222</span>
            <span>contact@orangecat.com</span>
        </div>
        <div className="footer-social">
            <h4>&copy; Orange Cat</h4>
            <ul className="footer-social-icon">
                {socialMediaLinks.map(({ icon, url }) => (
                    <li key={url}>
                        <a target="_blank" href={url} rel="noreferrer">
                            <FontAwesomeIcon size="xl" icon={icon} />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </footer>
);

export default Footer;