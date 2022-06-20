import { useCallback, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

import { Button, Input } from '../components';
import images from '../../assets';
import { useTheme } from 'next-themes';

interface FormInputType {
  price: string;
  name: string;
  description: string;
}

const CreateItem: NextPage = () => {
  const { theme } = useTheme();
  const [formInput, updateFormInput] = useState<FormInputType>({
    price: '',
    name: '',
    description: '',
  });

  const onDrop = () => {
    // upload file to the ipfs
    // to be implemented
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  return (
    <div className='flex justify-center sm:px-4 p-12'>
      <div className='w-3/5 md:w-full'>
        <h1 className='font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl'>
          Create new item
        </h1>
        <div className='mt-16'>
          <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xl'>
            Upload file
          </p>
          <div className='mt-4'>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className='flexCenter flex-col text-center'>
                <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-xl'>
                  JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                </p>

                <div className='my-12 w-full flex justify-center'>
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit='contain'
                    alt='file upload'
                    className={theme === 'light' ? 'filter invert' : undefined}
                  />
                </div>

                <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm'>
                  Drag and Drop File
                </p>
                <p className='font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2'>
                  Or browse media on your device
                </p>
              </div>
            </div>
          </div>
        </div>

        <Input
          inputType='input'
          title='Name'
          placeholder='Asset Name'
          handleClick={(e) => {
            updateFormInput({ ...formInput, name: e.target.value });
          }}
        />

        <Input
          inputType='textarea'
          title='Description'
          placeholder='Asset Description'
          handleClick={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />

        <Input
          inputType='number'
          title='Price'
          placeholder='Asset Price'
          handleClick={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />

        <div className='mt-7 w-full flex justify-end'>
          <Button
            btnName='Create Item'
            btnType='primary'
            classStyles='rounded-xl'
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
