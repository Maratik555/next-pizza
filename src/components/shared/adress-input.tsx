import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange?: (value?: string) => void;
}

export const AdressInput = ({ onChange }: Props) => {
    return <AddressSuggestions token="55a0fe2460d3ba8d731781d7fb5a86a6793006ae" onChange={(data) => onChange?.(data?.value)} />;
};