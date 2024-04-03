import React from "react";
import { useObserver } from 'mobx-react';
import appStore from './../store/AppStore';

const Preloader:React.FC = () => {
    return useObserver(() => (
        <div className={`preloader ${appStore.preloaderStatus ? '' : 'preloader--hide'} `}>
            <div className="preloader__ring"><div></div><div></div><div></div><div></div></div>
        </div>
    ));
}

export default Preloader;