import React, { useContext } from 'react';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'next-share';
import { Context } from '../../../../context/context';
import Modal from '../modal/Modal';

const SocialShare = ({ url }: { url: string }) => {
    const { share, setShare } = useContext(Context)
    return (
        <Modal>
            <div className="w-full">
                <FacebookShareButton url={url}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={url}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <WhatsappShareButton url={url}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>
            <button onClick={() => setShare(false)} className="ml-auto text-red-500 w-full bg-red-100 p-2 rounded-lg">Close</button>
        </Modal>
    );
};

export default SocialShare;
