import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { bindActionCreators } from 'redux';
import { getAccessTokenFromCookies } from '~/commons/commonUsedFunctions';
import { BaseResponse } from '~/commons/response';
import { fetchAsyncWithAuthentitaion, FETCH_TYPES } from '~/commons/sendRequest';
import { getImageAfterUploaded } from '~/commons/URLs';
import { Button, Input } from '~/components';
import InputTextArea from '~/components/InputTextArea';
import Select from '~/components/Select';
import { ButtonTypes, InputTypes, SelectTypes } from '~/constants/enums';
import localizations from '~/constants/locallizations';
import { useAppDispatch, useAppSelector } from '~/hooks';
import actionCreators from '~/redux';
import { Author } from '~/redux/action-creators/authorActionCreator';
import { SelectItem } from '~/components/Select';
import './AddNewBookContainer.scss';
import { CreateBookReq, Image } from '~/redux/action-creators/bookDetailsActionCreator';
import { BookImageTypeTDs } from '~/commons/enums';
import { RequestStatus } from '~/constants';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

export default function AddNewBookContainer() {
    const [title, setTitle] = useState<string>();
    const [quantity, setQuanttiy] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [publishedAt, setPublishedAt] = useState<string>();
    const [aboutThisItem, setAboutThisItem] = useState<string>("");
    const [storeDescription, setStoreDescription] = useState<string>("");
    const [termsOfSale, setTermsOfSale] = useState<string>("");
    const [shippingTerm, setShippingTerm] = useState<string>("");
    const [synopsis, setSynopsis] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState("");
    const [publisherId, setPublisherId] = useState<string>('');
    const [bookConditionId, setBookConditionId] = useState<number>();
    const [authorId, setAuthorId] = useState<string>('');
    const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
    const [isQuantityValid, setIsQuanttiyValid] = useState<boolean>(true);
    const [isPriceValid, setIsPriceValid] = useState<boolean>(true);
    const [isPublishedAtValid, setIsPublishedAtValid] = useState<boolean>(true);
    const [isAboutThisItemValid, setIsAboutThisItemValid] = useState<boolean>(true);
    const [isStoreDescriptionValid, setIsStoreDescriptionValid] = useState<boolean>(true);
    const [isTermsOfSaleValid, setIsTermsOfSaleValid] = useState<boolean>(true);
    const [isShippingTermValid, setIsShippingTermValid] = useState<boolean>(true);
    const [isSynopsisValid, setIsSynopsisValid] = useState<boolean>(true);
    const [isSelectedImageValid, setIsSelectedImageValid] = useState(true);
    const [isPublisherIdValid, setIsPublisherIdvalid] = useState<boolean>(true);
    const [isBookConditionIdValid, setIsBookConditionIdValid] = useState<boolean>(true);
    const [isAuthorIdValid, setIsAuthorIdValid] = useState<boolean>(true);
    const accessToken = getAccessTokenFromCookies();
    const dispatch = useAppDispatch();
    const { getAuthors, getPublishers, createBook, getAllBookConditionsAction, resetBookDetails } = bindActionCreators(actionCreators, dispatch);
    const authors = useAppSelector(state => state.authorReducer.authors);
    const publishers = useAppSelector(state => state.publisherReducer.publishers);
    const { bookConditions, createBookStatus } = useAppSelector(state => state.bookDetailsReducer);
    const navigate = useNavigate();

    useEffect(() => {
        if (createBookStatus === RequestStatus.Fulfilled) {
            resetBookDetails();
            navigate(routes.myAccount)
        }
    }, [createBookStatus]);

    const authorSelection = useMemo<Array<SelectItem>>(
        () =>
        authors.map((a) => {
                const option: SelectItem = {
                    id: a.id,
                    value: a.name,
                };
                return option;
            }),
        [authors],
    );

    const publisherSelection = useMemo<Array<SelectItem>>(
        () =>
        publishers.map((p) => {
                const option: SelectItem = {
                    id: p.id,
                    value: p.name,
                };
                return option;
            }),
        [publishers],
    );

    const bookConditionSelection = useMemo<Array<SelectItem>>(
        () =>
        bookConditions.map((p) => {
                const option: SelectItem = {
                    id: p.id,
                    value: p.name,
                };
                return option;
            }),
        [bookConditions],
    );

    const onFileChange = async (e : any) => {
        const file = e.target.files[0]

        const formData = new FormData();
        formData.append(
            "files",
            file,
            file.name
        );
        
        const response = await fetchAsyncWithAuthentitaion<BaseResponse<string>>("https://localhost:5001/Upload/UploadFile", FETCH_TYPES.POST, accessToken, formData);
        setSelectedImage(getImageAfterUploaded(response.data.data));
    }

    useEffect(() => {
        getAuthors(accessToken);
        getPublishers(accessToken);
        getAllBookConditionsAction();
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = () => {
        const bookDetails : any= {};
        bookDetails["Store Description"] = {};
        bookDetails["Store Description"].value = storeDescription;
        bookDetails["Store Description"]["Terms of Sale"] = termsOfSale;
        bookDetails["Store Description"]["Shipping Terms"] = shippingTerm;
        bookDetails["About this title"] = {};
        bookDetails["About this title"]["Synopsis"] = synopsis;
        if (!title) {
            setIsTitleValid(false);
        }
        else if (!quantity) {
            setIsQuanttiyValid(false)
        }
        else if (!price) {
            setIsPriceValid(false)
        }
        else if (!publishedAt) {
            setIsPublishedAtValid(false);
        }
        else if (!aboutThisItem) {
            setIsAboutThisItemValid(false);
        }
        else if (!storeDescription) {
            setIsStoreDescriptionValid(false)
        }
        else if (!termsOfSale) {
            setIsTermsOfSaleValid(false)
        }
        else if (!synopsis) {
            setIsSynopsisValid(false)
        }
        else if (!shippingTerm) {
            setIsShippingTermValid(false)
        }
        else if (!selectedImage) {
            setIsSelectedImageValid(false)
        }
        else if (!publisherId) {
            setIsPublisherIdvalid(false);
        }
        else if (!bookConditionId) {
            setIsBookConditionIdValid(false);
        }
        else if (!authorId) {
            setIsAuthorIdValid(false);
        }
        else if (authorId && publisherId && publishedAt && title && selectedImage && quantity && price && storeDescription && bookConditionId) {
            const mainImage : Image = {
                url: selectedImage,
                bookImageTypeId: BookImageTypeTDs.Main
            }

            const request : CreateBookReq = {
                accessToken: accessToken,
                authorId: authorId,
                pulisherId: publisherId,
                publishedAt: publishedAt,
                bookConditionId: bookConditionId,
                description: aboutThisItem,
                bookDetails: JSON.stringify(bookDetails),
                edition: 1,
                images: [mainImage],
                title: title,
                price: price,
                quantity: quantity
            }

            createBook(request);
        }
    }

    
    return (
        <div className="shipping-address-form">
            <div className="shipping-address-body">
                <div className="shipping-address-body-header">
                    <span className="shipping-address-body-header__title">{localizations.addNewBook}</span>
                </div>
                <div className="shipping-address-inputs display-flex flex-direction--column">
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.title}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            value={title}
                            onChange={(e : any) => {
                                setTitle(e.target.value)
                                setIsTitleValid(true);
                            }}
                            isValid={isTitleValid}
                            
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                                {localizations.quantity}
                                <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            type="number"
                            value={quantity}
                            onChange={(e : any) => {
                                setQuanttiy(e.target.value)
                                setIsQuanttiyValid(true);
                            }}
                            isValid={isQuantityValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.price}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            type="number"
                            value={price}
                            onChange={(e : any) => {
                                setPrice(e.target.value)
                                setIsPriceValid(true);
                            }}
                            isValid={isPriceValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                                {localizations.publishedAt}
                                <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            value={publishedAt}
                            type="date"
                            onChange={(e : any) => {
                                setPublishedAt(e.target.value)
                                setIsPublishedAtValid(true);
                            }}
                            isValid={isPublishedAtValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <Select
                            label={localizations.publisher}
                            isRequired={true}
                            selectType={SelectTypes.ADDRESS_FORM}
                            items={publisherSelection}
                            value={publisherId}
                            onChange={(e: any) => {
                                setPublisherId(e.target.value);
                                setIsPublisherIdvalid(true);
                            }}
                            isValid={isPublisherIdValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <Select
                            label={localizations.bookCondition}
                            isRequired={true}
                            selectType={SelectTypes.ADDRESS_FORM}
                            items={bookConditionSelection}
                            value={bookConditionId}
                            onChange={(e: any) => {
                                setBookConditionId(e.target.value);
                                setIsBookConditionIdValid(true);
                            }}
                            isValid={isBookConditionIdValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <Select
                            label={localizations.author}
                            isRequired={true}
                            selectType={SelectTypes.ADDRESS_FORM}
                            items={authorSelection}
                            value={authorId}
                            onChange={(e: any) => {
                                setAuthorId(e.target.value);
                                setIsAuthorIdValid(true);
                            }}
                            isValid={isAuthorIdValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.aboutThisItem}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <InputTextArea 
                            cols={40} 
                            rows={5}
                            value={aboutThisItem}
                            onChange={(e : any) => {
                                setAboutThisItem(e.target.value)
                                setIsAboutThisItemValid(true);
                            }}
                            isValid={isAboutThisItemValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.storeDescription}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <InputTextArea
                            cols={40} 
                            rows={5}
                            value={storeDescription}
                            onChange={(e : any) => {
                                setStoreDescription(e.target.value)
                                setIsStoreDescriptionValid(true);
                            }}
                            isValid={isStoreDescriptionValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.termOfSale}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <InputTextArea
                            cols={40} 
                            rows={5}
                            value={termsOfSale}
                            onChange={(e : any) => {
                                setTermsOfSale(e.target.value)
                                setIsTermsOfSaleValid(true);
                            }}
                            isValid={isTermsOfSaleValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.shippingTerm}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <InputTextArea
                            cols={40} 
                            rows={5}
                            value={shippingTerm}
                            onChange={(e : any) => {
                                setShippingTerm(e.target.value)
                                setIsShippingTermValid(true);
                            }}
                            isValid={isShippingTermValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.synopsis}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <InputTextArea
                            cols={40} 
                            rows={5}
                            value={synopsis}
                            onChange={(e : any) => {
                                setSynopsis(e.target.value)
                                setIsSynopsisValid(true);
                            }}
                            isValid={isSynopsisValid}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                            {localizations.mainImage}
                            <span className="shipping-address-input__label--required">*</span>
                        </label>
                            <Input 
                                type="file" 
                                onChange={(e : any) => {
                                    onFileChange(e);
                                    setIsSelectedImageValid(true);
                                }}
                                value={""}
                                isValid={isSelectedImageValid}
                                />
                        <div className='add-new-book-container-main-image'>
                            {
                                selectedImage && selectedImage.length > 0 
                                && 
                                <img 
                                    src={`${selectedImage}`}
                                    className='add-new-book-container-main-image__image'
                                />
                            }
                        </div>
                    </div>
                    <div className="shipping-address-input">
                        <div className="shipping-address-submit">
                            <Button
                                type={ButtonTypes.ADDTOBASKET}
                                onClick={(e : any) => {
                                    onSubmit();
                                }}
                                isLoading={createBookStatus === RequestStatus.Pending}
                            >
                                <span className="shipping-address-submit__text">{localizations.submit}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
