import React from "react";
import {
    Field,
    reduxForm,
    reset,
    FormErrors,
    InjectedFormProps,
} from "redux-form";
import { ReviewFormProps } from "./Body";
//Re-usable component
export interface ReviewFormValues {
    username: string;
    title: string;
    review: string;
    rating: number;
}

//Typescriptand redux form:
//https://levelup.gitconnected.com/react-js-typescript-redux-redux-form-jest-e522995ebe36

//Need to hoist render methods up or else it will give error where it will unfocus after first characther is typed
//https://stackoverflow.com/questions/39839051/using-redux-form-im-losing-focus-after-typing-the-first-character

const renderError = ({ error, touched }: any) => {
    if (touched && error) {
        //Touched (for input) will be false at first
        //When clicked and then clicked otuside of the input, it will be true
        return <div className="errorText">{error}</div>;
    }
};

const renderInput = ({ input, label, meta, placeHolder }: any) => {
    //"component" property automatically passes props to argument, it has {input properties and meta properties}
    //"label" automatically passes props to arguments
    return (
        <div>
            <label>{label}</label>
            <input
                className="createInputsAndTextArea"
                {...input}
                autoComplete="off"
                placeholder={placeHolder}
            />
            {renderError(meta)}
        </div>
    );
    //{..input} is shortcut for redux-form; where you take all the input from "component's" props and pass it as
    //props to <input>
};

const renderTextArea = ({ input, label, meta, placeHolder }: any) => {
    //"component" property automatically passes props to argument, it has {input properties and meta properties}
    //"label" automatically passes props to arguments
    return (
        <div>
            <label>{label}</label>
            <textarea
                className="createInputsAndTextArea"
                {...input}
                autoComplete="off"
                placeholder={placeHolder}
            />
            {renderError(meta)}
        </div>
    );
};

const ReviewForm: React.FC<
    ReviewFormProps & InjectedFormProps<{}, ReviewFormProps>
> = (props) => {
    const onSubmit = (formValues: any, dispatch: any) => {
        //onSubmit's default param is any
        //event.preventDefault() is automatically called with handleSubmit, a redux-form property
        //form values are the values from the fields that redux-form automatiacally passes [which is done in streamForm]
        //after clicking the submit button
        dispatch(reset("reviewForm"));
        props.onSubmit(formValues);
    };
    return (
        <React.Fragment>
            <form
                data-testid="reviewForm"
                onSubmit={props.handleSubmit(onSubmit)}
            >
                <div className="createFormSection">
                    <h1> Enter Your Username </h1>
                    <Field
                        name="username"
                        type="text"
                        component={renderInput}
                        placeHolder="Apple Username"
                    />
                </div>
                <div className="createFormSection">
                    <h1> Enter Review Title</h1>
                    <Field
                        name="title"
                        component={renderInput}
                        placeHolder="Title of Review"
                    />
                </div>
                <div className="createFormSection">
                    <h1> Your Review</h1>
                    <Field
                        name="review"
                        component={renderTextArea}
                        placeHolder="This app is amazing...."
                    />
                </div>
                <div className="createFormSection">
                    <h1> Rating (From 0 - 5) </h1>
                    <Field
                        name="rating"
                        component={renderInput}
                        placeHolder="5"
                    />
                </div>
                <button className="blueButton">Submit</button>
            </form>
        </React.Fragment>
    );
};

const validate = (
    formValues: ReviewFormValues
): FormErrors<ReviewFormValues> => {
    //MUST BE NAMED VALIDATE! Other names would be ignored by reduxForm(..)
    const errors: FormErrors<ReviewFormValues> = {};
    //If you return an empty object, redux form will assume everything is ok
    if (!formValues.username) {
        //user did not enter title, so undefined
        errors.username = "You must enter a username";
        //Must be the same name as field name! The "error" property in {meta} would receive this
    }

    if (!formValues.title) {
        errors.title = "You must enter a title";
    }

    if (!formValues.review) {
        errors.review = "You must enter a review";
    }

    if (
        !(formValues.rating >= 0 && formValues.rating <= 5) ||
        !formValues.rating
    ) {
        errors.rating = "You must enter a rating from 0 to 5";
    }
    return errors;
    //Erors is going to be passed to renderInput's meta
};

export default reduxForm<{}, ReviewFormProps>({
    form: "reviewForm",
    validate,
})(ReviewForm);

// export default connect(null, { createStream })(formWrapped);
