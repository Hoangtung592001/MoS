import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getAccessTokenFromCookies, getRequiredErrorMessage } from "~/commons/commonUsedFunctions";
import { Button, Input } from "~/components"
import routes from "~/config/routes";
import { RequestStatus } from "~/constants";
import { ButtonTypes, InputTypes } from "~/constants/enums";
import localizations from "~/constants/locallizations"
import { useAppDispatch, useAppSelector } from "~/hooks";
import actionCreators from "~/redux";
import { CreatePublisherReq } from "~/redux/action-creators/publisherActionCreator";

export default function AddNewPublisherContainer() {
    const [publisherName, setPublisherName] = useState<string>("");
    const [isPublisherValid, setIsPublisherValid] = useState<boolean>(true);
    const [publisherNameErrorMessage, setPublisherNameErrorMessage] = useState<string>("");
    const dispatch = useAppDispatch();
    const { createPublisherAction, resetPublisher } = bindActionCreators(actionCreators, dispatch);
    const createPublisherStatus = useAppSelector(state => state.publisherReducer.createPublisherStatus);
    const accessToken = getAccessTokenFromCookies();
    const navigate = useNavigate();
    const onSubmit = useCallback((accessToken: string, publisherName: string) => {
        const publisherNameValid = !!publisherName;

        if (!publisherNameValid) {
            setIsPublisherValid(false);
            setPublisherNameErrorMessage(getRequiredErrorMessage(localizations.publisherName));
        }

        if (publisherName) {
            const request : CreatePublisherReq = {
                accessToken: accessToken,
                name: publisherName
            };
            createPublisherAction(request);
        }

    }, []);

    useEffect(() => {
        if (createPublisherStatus === RequestStatus.Fulfilled) {
            resetPublisher();
            navigate(routes.myAccount);
        }
    }, [createPublisherStatus]);
    
    return (
        <div className="shipping-address-form">
            <div className="shipping-address-body">
                <div className="shipping-address-body-header">
                    <span className="shipping-address-body-header__title">{localizations.createNewPublisher}</span>
                </div>
                <div>
                    <div className="shipping-address-input">
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            value={publisherName}
                            onChange={(e : any) => {
                                setPublisherName(e.target.value)
                                setIsPublisherValid(true);
                            }}
                            isValid={isPublisherValid}
                            errorMessage={publisherNameErrorMessage}
                            isRequired={true}
                            label={localizations.publisherName}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <div className="shipping-address-submit">
                            <Button
                                type={ButtonTypes.ADDTOBASKET}
                                isLoading={createPublisherStatus === RequestStatus.Pending}
                                onClick={(e : any) => {
                                    onSubmit(accessToken, publisherName);
                                }}
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
