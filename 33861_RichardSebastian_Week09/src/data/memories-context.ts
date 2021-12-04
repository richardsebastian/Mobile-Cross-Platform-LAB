import React from "react";

export interface Memory {
    id: string;
    imagePath: string;
    title: string;
    type: 'good' | 'bad';
    base64Url: string;
    lat: number;
    lng: number;
}

const MemoriesContext = React.createContext <{
    memories: Memory[];
    addMemory: (path: string, base64Data: string, title: string, type: 'good' | 'bad', lat: number, lng: number) => void;
    initContext: () => void;
}>({
    memories: [],
    addMemory: () => {},
    initContext: () => {}
})

export default MemoriesContext;