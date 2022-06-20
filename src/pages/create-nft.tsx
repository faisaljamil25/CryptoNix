import { useState } from 'react';
import type { NextPage } from 'next';

import { Button, Input } from '../components';

interface FormInputType {
  price: string;
  name: string;
  description: string;
}

const CreateItem: NextPage = () => {
  const [formInput, updateFormInput] = useState<FormInputType>({
    price: '',
    name: '',
    description: '',
  });

  return (
    <div className='flex justify-center sm:px-4 p-12'>
      <div className='w-3/5 md:w-full'>
        <h1 className='font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl'>
          Create new item
        </h1>
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
