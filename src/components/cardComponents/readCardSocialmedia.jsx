import '../../assets/styles/cardCSS/readCardSocialmedia.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/fontawesome-free-brands'

function SocialMedia() {


    return (
        <>
            <ul className="socialmedia-icon">
                <li><a target="_blank" href="https://www.facebook.com/" rel="noreferrer"><FontAwesomeIcon size="xl" icon={faFacebook} /></a></li>
                <li><a target="_blank" href="https://www.instagram.com/" rel="noreferrer"><FontAwesomeIcon size="xl" icon={faInstagram} /></a></li>
                <li><a target="_blank" href="https://twitter.com/" rel="noreferrer"><FontAwesomeIcon size="xl" icon={faTwitter} /></a></li>
            </ul>
        </>
    )
}

export default SocialMedia;