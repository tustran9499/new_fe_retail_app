import React, { useEffect, useState } from "react";
import { Upload, Button, Avatar, message } from "antd";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";
import { ProductStoreContext } from "../../product.store";
import productService from '../../../../modules/product/product.service';

// const token = checkToken();

const UploadAvatarDynamic = (record) => {
        const productStore = React.useContext(ProductStoreContext);
        const [imageUrl, setImageUrl] = React.useState(
            record.record.PhotoURL
        );
        console.log(record.record.PhotoURL);
        useEffect(() => {

        }, [imageUrl]);

        const [fileList, setFileList] = useState([
            // {
            //   uid: '-1',
            //   name: 'image.png',
            //   status: 'done',
            //   url: 'https://cdn2.iconfinder.com/data/icons/product-packaging-color-line/48/product_packaging_pixel_perfect_color_line_icons_2-cardboard-512.png',
            // },
        ]);
        // const sleep = (milliseconds) => {
        //   return new Promise((resolve) => setTimeout(resolve, milliseconds));
        // };
        const onChange = async({ file: newFile, fileList: newFileList }) => {
            // const newdata = await productService.getOneProduct(id.id);
            // console.log("data");
            // console.log(newdata)
            console.log("new file list");
            console.log(newFileList);
            setFileList(newFileList);
            console.log(newFile)
            if (newFile.status === 'done') {
                setImageUrl("http://127.0.0.1:4000/api/products/img/" + String(newFile.response.filename));

                console.log("http://127.0.0.1:4000/api/products/img/" + String(newFile.response.filename));
                await record.refetch();
            }

            // pross.onsub();
            // getAccountDetailApi()
            //   .then((res) => {
            //     dispatch(setua({ username: username, avatar: res.data.AvatarPath }));
            //     if (res.status === 200) {
            //       message.success(res.statusText);
            //     } else {
            //       message.error(res.statusText);
            //     }
            //   })
            //   .catch((error) => {
            //     message.error(error.data.message);
            //   });
        };

        const onPreview = async(file) => {
            let src = file.url;
            if (!src) {
                src = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file.originFileObj);
                    reader.onload = () => resolve(reader.result);
                });
            }
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow.document.write(image.outerHTML);
        };

        function beforeUpload(file) {
            console.log("current id");
            console.log(record.record.Id)
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
                message.error('Image must smaller than 10MB!');
            }
            return isJpgOrPng && isLt2M;
        }

        return ( <
                ImgCrop beforeCrop = { beforeUpload }
                rotate >
                <
                Upload action = { "http://127.0.0.1:4000/" + "api/products/avatar/" + record.record.Id }
                // headers={{ Authorization: `Bearer ${token}` }}
                // listType="picture-card"
                fileList = { fileList }
                onChange = { onChange }
                onPreview = { onPreview } >
                {
                    fileList.length < 1 && ( < Avatar shape = "square"
                        size = { 150 }
                        style = {
                            { padding: 0 } }
                        src = { "http://127.0.0.1:4000/api/products/img/" + String(imageUrl) }
                        />)} <
                        /Upload> <
                        /ImgCrop>
                    );
                };

                export default UploadAvatarDynamic;