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

const SocialShare = ({ url }: { url: string }) => {
    const { share, setShare } = useContext(Context)
    return (
        <div className={`p-2 absolute inset-x-0 bottom-0 transition-all duration-500 transform ${share ? 'translate-y-0' : 'translate-y-full'} bg-white rounded-t-xl border-t border-t-blue-500`}>
            <div className="flex w-full p-2 h-[100px] itemce justify-between">
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
        </div>
    );
};

export default SocialShare;
