import { useEffect, useMemo, useState } from 'react';
import { bindActionCreators } from 'redux';
import { getAccessTokenFromCookies, getDateTimeFromServer, getRequiredErrorMessage } from '~/commons/commonUsedFunctions';
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
import { SelectItem } from '~/components/Select';
import './EditBookContainer.scss';
import { EditBookImage, EditBookReq } from '~/redux/action-creators/bookDetailsActionCreator';
import { BookImageTypeTDs } from '~/commons/enums';
import { RequestStatus } from '~/constants';
import { useNavigate, useParams } from 'react-router-dom';
import routes from '~/config/routes';

export default function EditBookContainer() {
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
    const [titleErrorMessage, setTitleErrorMessage] = useState<string>("");
    const [quantityErrorMessage, setQuantityErrorMessage] = useState<string>("");
    const [priceErrorMessage, setPriceErrorMessage] = useState<string>("");
    const [publishedAtErrorMessage, setPublishedAtErrorMessage] = useState<string>("");
    const [publisherErrorMessage, setPublisherErrorMessage] = useState<string>("");
    const [bookConditionErrorMessage, setBookConditionErrorMessage] = useState<string>("");
    const [authorErrorMessage, setAuthorErrorMessage] = useState<string>("");
    const [aboutThisItemErrorMessage, setAboutThisItemErrorMessage] = useState<string>("");
    const [storeDescriptionErrorMessage, setStoreDescriptionErrorMessage] = useState<string>("");
    const [termOfSaleErrorMessage, setTermOfSaleErrorMessage] = useState<string>("");
    const [shippingTermErrorMessage, setShippingTermErrorMessage] = useState<string>("");
    const [synopsisErrorMessage, setSynopsisErrorMessage] = useState<string>("");
    const [mainImageErrorMessage, setMainImageErrorMessage] = useState<string>("");
    const accessToken = getAccessTokenFromCookies();
    const dispatch = useAppDispatch();
    const { getAuthors, getPublishers, editBook, getAllBookConditionsAction, getBookDetails, resetBookDetails } = bindActionCreators(actionCreators, dispatch);
    const authors = useAppSelector(state => state.authorReducer.authors);
    const publishers = useAppSelector(state => state.publisherReducer.publishers);
    const { bookConditions, editBookStatus } = useAppSelector(state => state.bookDetailsReducer);
    const navigate = useNavigate();
    const { bookId } = useParams();
    const bookDetails = useAppSelector((state) => state.bookDetailsReducer.bookDetails);

    useEffect(() => {
        if (bookDetails) {
            setAuthorId(bookDetails.authorId);
            setBookConditionId(bookDetails.bookCondition.id);
            setSelectedImage(bookDetails.bookImages[0].url);
            setAboutThisItem(bookDetails.description);
            setPrice(bookDetails.price);
            setPublisherId(bookDetails.publisherId);
            setQuanttiy(bookDetails.quantity);
            const bookPublishedAt = getDateTimeFromServer(bookDetails.publishedAt);
            setPublishedAt(bookPublishedAt);
            const details : any = JSON.parse(bookDetails.bookDetails);
            setStoreDescription(details["Store Description"].value);
            setShippingTerm(details["Store Description"]["Shipping Terms"]);
            setTermsOfSale(details["Store Description"]["Terms of Sale"]);
            setSynopsis(details["About this title"]["Synopsis"]);
            setTitle(bookDetails.title)
        }
    }, [bookDetails]);
    useEffect(() => {
        if (bookId) {
            getBookDetails("", bookId);
        }
    }, [bookId]);

    useEffect(() => {
        if (editBookStatus === RequestStatus.Fulfilled) {
            resetBookDetails();
            navigate(routes.books)
        }
    }, [editBookStatus]);

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
        if (!title) {
            setIsTitleValid(false);
            setTitleErrorMessage(getRequiredErrorMessage(localizations.title));
        }
        if (!quantity) {
            setIsQuanttiyValid(false)
            setQuantityErrorMessage(getRequiredErrorMessage(localizations.quantity));
        }
        if (!price) {
            setIsPriceValid(false)
            setPriceErrorMessage(getRequiredErrorMessage(localizations.price));
        }
        if (!publishedAt) {
            setIsPublishedAtValid(false)
            setPublishedAtErrorMessage(getRequiredErrorMessage(localizations.publishedAt));
        }
        if (!aboutThisItem) {
            setIsAboutThisItemValid(false)
            setAboutThisItemErrorMessage(getRequiredErrorMessage(localizations.aboutThisItem));
        }
        if (!storeDescription) {
            setIsStoreDescriptionValid(false)
            setStoreDescriptionErrorMessage(getRequiredErrorMessage(localizations.storeDescription));
        }
        if (!termsOfSale) {
            setIsTermsOfSaleValid(false)
            setTermOfSaleErrorMessage(getRequiredErrorMessage(localizations.termOfSale));
        }
        if (!synopsis) {
            setIsSynopsisValid(false)
            setSynopsisErrorMessage(getRequiredErrorMessage(localizations.synopsis));
        }
        if (!shippingTerm) {
            setIsShippingTermValid(false)
            setShippingTermErrorMessage(getRequiredErrorMessage(localizations.shippingTerm));
        }
        if (!selectedImage) {
            setIsSelectedImageValid(false)
            setMainImageErrorMessage(getRequiredErrorMessage(localizations.mainImage));
        }
        if (!publisherId) {
            setIsPublisherIdvalid(false)
            setPublisherErrorMessage(getRequiredErrorMessage(localizations.publisher));
        }
        if (!bookConditionId) {
            setIsBookConditionIdValid(false)
            setBookConditionErrorMessage(getRequiredErrorMessage(localizations.bookCondition));
        }
        if (!authorId) {
            setIsAuthorIdValid(false)
            setAuthorErrorMessage(getRequiredErrorMessage(localizations.author));
        }

        const details : any= {};
        details["Store Description"] = {};
        details["Store Description"].value = storeDescription;
        details["Store Description"]["Terms of Sale"] = termsOfSale;
        details["Store Description"]["Shipping Terms"] = shippingTerm;
        details["About this title"] = {};
        details["About this title"]["Synopsis"] = synopsis;

        if (authorId && publisherId && publishedAt && title && selectedImage && quantity && price && aboutThisItem && storeDescription && bookConditionId && termsOfSale && shippingTerm && synopsis && bookId && bookDetails) {
            
            const mainImage : EditBookImage = {
                id: bookDetails.bookImages[0].id,
                url: selectedImage,
                bookImageTypeId: BookImageTypeTDs.Main
            }

            const request : EditBookReq = {
                id: bookId,
                accessToken: accessToken,
                authorId: authorId,
                pulisherId: publisherId,
                publishedAt: publishedAt,
                bookConditionId: bookConditionId,
                description: aboutThisItem,
                bookDetails: JSON.stringify(details),
                edition: 1,
                image: mainImage,
                title: title,
                price: price,
                quantity: quantity
            }

            editBook(request);
        }
    }

    
    return (
        <div className="shipping-address-form">
            <div className="shipping-address-body">
                <div className="shipping-address-body-header">
                    <span className="shipping-address-body-header__title">{localizations.editBook}</span>
                </div>
                <div className="shipping-address-inputs display-flex flex-direction--column">
                    <div className="shipping-address-input">
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            value={title}
                            onChange={(e : any) => {
                                setTitle(e.target.value)
                                setIsTitleValid(true);
                            }}
                            isRequired={true}
                            isValid={isTitleValid}
                            label={localizations.title}
                            errorMessage={titleErrorMessage}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            type="number"
                            value={quantity}
                            onChange={(e : any) => {
                                setQuanttiy(e.target.value)
                                setIsQuanttiyValid(true);
                            }}
                            isValid={isQuantityValid}
                            isRequired={true}
                            label={localizations.quantity}
                            errorMessage={quantityErrorMessage}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            type="number"
                            value={price}
                            onChange={(e : any) => {
                                setPrice(e.target.value)
                                setIsPriceValid(true);
                            }}
                            isValid={isPriceValid}
                            isRequired={true}
                            label={localizations.price}
                            errorMessage={priceErrorMessage}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            value={publishedAt}
                            type="date"
                            onChange={(e : any) => {
                                setPublishedAt(e.target.value)
                                setIsPublishedAtValid(true);
                            }}
                            isValid={isPublishedAtValid}
                            isRequired={true}
                            label={localizations.publishedAt}
                            errorMessage={publishedAtErrorMessage}
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
                            errorMessage={publisherErrorMessage}
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
                            errorMessage={bookConditionErrorMessage}
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
                            errorMessage={authorErrorMessage}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <InputTextArea 
                            cols={40} 
                            rows={5}
                            value={aboutThisItem}
                            onChange={(e : any) => {
                                setAboutThisItem(e.target.value)
                                setIsAboutThisItemValid(true);
                            }}
                            isValid={isAboutThisItemValid}
                            errorMessage={aboutThisItemErrorMessage}
                            label={localizations.aboutThisItem}
                            isRequired={true}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <InputTextArea
                            cols={40} 
                            rows={5}
                            value={storeDescription}
                            onChange={(e : any) => {
                                setStoreDescription(e.target.value)
                                setIsStoreDescriptionValid(true);
                            }}
                            isValid={isStoreDescriptionValid}
                            errorMessage={storeDescriptionErrorMessage}
                            label={localizations.storeDescription}
                            isRequired={true}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <InputTextArea
                            cols={40}
                            rows={5}
                            value={termsOfSale}
                            onChange={(e : any) => {
                                setTermsOfSale(e.target.value)
                                setIsTermsOfSaleValid(true);
                            }}
                            isValid={isTermsOfSaleValid}
                            errorMessage={termOfSaleErrorMessage}
                            label={localizations.termOfSale}
                            isRequired={true}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <InputTextArea
                            cols={40}
                            rows={5}
                            value={shippingTerm}
                            onChange={(e : any) => {
                                setShippingTerm(e.target.value)
                                setIsShippingTermValid(true);
                            }}
                            isValid={isShippingTermValid}
                            errorMessage={shippingTermErrorMessage}
                            label={localizations.shippingTerm}
                            isRequired={true}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <InputTextArea
                            cols={40}
                            rows={5}
                            value={synopsis}
                            onChange={(e : any) => {
                                setSynopsis(e.target.value)
                                setIsSynopsisValid(true);
                            }}
                            isValid={isSynopsisValid}
                            errorMessage={synopsisErrorMessage}
                            label={localizations.synopsis}
                            isRequired={true}
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
                                errorMessage={mainImageErrorMessage}
                                />
                        <div className='add-new-book-container-main-image'>
                            {
                                selectedImage && selectedImage.length > 0 && 
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
                                isLoading={editBookStatus === RequestStatus.Pending}
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
