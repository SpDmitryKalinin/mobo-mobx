import React, {useState} from "react";
import pictureStoreClass from "../store/PictureStore";
import { observer } from "mobx-react";
import { generateUniqueKey } from "../utils/utils";

const Picture: React.FC = observer(() => {
    const imgArray = Object.values(pictureStoreClass.imgObject);
    return (
        <div className="picture">
            {imgArray.map(((img: string | boolean) => {
                if(typeof img === 'boolean') {
                    return
                }
                return <img key={generateUniqueKey()} className={'picture__img--scale'} src={img} alt="1" />
            }))}
        </div>
    )
})

export default Picture;