export interface NewsItemInterface{
    pageType: string,
    type: string
}

export interface InterfaceModalCategory{
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}