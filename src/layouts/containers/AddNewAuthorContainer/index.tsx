import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getAccessTokenFromCookies } from "~/commons/commonUsedFunctions";
import { Button, Input } from "~/components"
import routes from "~/config/routes";
import { RequestStatus } from "~/constants";
import { ButtonTypes, InputTypes } from "~/constants/enums";
import localizations from "~/constants/locallizations"
import { useAppDispatch, useAppSelector } from "~/hooks";
import actionCreators from "~/redux";
import { CreateAuthorReq } from "~/redux/action-creators/authorActionCreator";

export default function AddNewAuthorContainer() {
    const [authorName, setAuthorName] = useState<string>("");
    const dispatch = useAppDispatch();
    const { createAuthorAction, resetAuthor } = bindActionCreators(actionCreators, dispatch);
    const createAuthorStatus = useAppSelector(state => state.authorReducer.createAuthorStatus);
    const accessToken = getAccessTokenFromCookies();
    const navigate = useNavigate();
    const onSubmit = useCallback((accessToken: string, authorName: string) => {
        const request : CreateAuthorReq = {
            accessToken: accessToken,
            name: authorName
        };

        createAuthorAction(request);
    }, []);

    useEffect(() => {
        if (createAuthorStatus === RequestStatus.Fulfilled) {
            resetAuthor();
            navigate(routes.myAccount);
        }
    }, [createAuthorStatus]);
    
    return (
        <div className="shipping-address-form">
            <div className="shipping-address-body">
                <div className="shipping-address-body-header">
                    <span className="shipping-address-body-header__title">{localizations.createNewAuthor}</span>
                </div>
                <div>
                    <div className="shipping-address-input">
                        <label htmlFor="" className="shipping-address-input__label">
                                {localizations.authorName}
                                <span className="shipping-address-input__label--required">*</span>
                        </label>
                        <Input
                            inputType={InputTypes.ADDRESS_FORM}
                            value={authorName}
                            onChange={(e : any) => {
                                setAuthorName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="shipping-address-input">
                        <div className="shipping-address-submit">
                            <Button
                                type={ButtonTypes.ADDTOBASKET}
                                onClick={(e : any) => {
                                    onSubmit(accessToken, authorName);
                                }}
                                isLoading={createAuthorStatus === RequestStatus.Pending}
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
