import * as Application from 'expo-application'
import React, { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
} from "react-native";
import { aboutUsContent, contactUsContent } from '../../../data';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useThemeColor } from '../../../components';
import Colors from '../../../constants/Colors';
const ContactUs = () => {
    const [name, setName] = useState("");
    const [nameIsValid, setNameIsValid] = useState(true);
    const [email, setEmail] = useState("");
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [message, setMessage] = useState("");
    const [messageIsValid, setMessageIsValid] = useState(true);
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        setDisabled(!formIsValid())
    }, [name, email, message]) // Only re-run the effect if name or email change


    const validateEmail = (input: string) => {
        if (input === '') return true;
        // check for @ sign
        var atSymbol = input.indexOf("@");
        if (atSymbol < 1) return false;
        var dot = input.indexOf(".");
        if (dot <= atSymbol + 2) return false;
        // check that the dot is not at the end
        if (dot === input.length - 1) return false;
        return true;
    }
    const primary = useThemeColor({}, 'black');


    const onEmailChange = (val: string) => {
        setEmailIsValid(validateEmail(val))
        setEmail(val)
    }

    const onNameChange = (val: string) => {
        setNameIsValid(val !== "");
        setName(val);
    }

    const onMsgChange = (val: string) => {
        setMessageIsValid(val !== "");
        setMessage(val);
    }

    const formIsValid = () => {
        return name !== '' && validateEmail(email) && message !== '';
    }

    const onSubmit = () => {
        console.log('name is', name);
        console.log('email is', email);
        console.log('msg is ', message);
    }

    return (
        <>
            <Text style={styles.contactUsContent}>{contactUsContent}</Text>
            <TextInput
                style={styles.contactUsInput}
                label="Name"
                value={name}
                activeUnderlineColor={formColor}
                onChangeText={val => onNameChange(val)}
            />
            {!nameIsValid ? <HelperText type="error" visible={true} style={styles.errorMsg}>
                Name can't be empty
            </HelperText> : null}

            <TextInput
                style={styles.contactUsInput}
                label="Email"
                value={email}
                activeUnderlineColor={formColor}

                onChangeText={val => onEmailChange(val)}
            />
            {!emailIsValid ? <HelperText type="error" visible={true} style={styles.errorMsg}>
                Please provide a valid Email address
            </HelperText> : null}

            <TextInput
                style={styles.contactUsInput}
                label="Message"
                value={message}
                activeUnderlineColor={formColor}
                multiline={true}
                numberOfLines={10}
                onChangeText={val => onMsgChange(val)}
            />
            {!messageIsValid ? <HelperText type="error" visible={true} style={styles.errorMsg}>
                Message can't be empty
            </HelperText> : null}

            <Button mode="contained"
                labelStyle={styles.submitBtnLabel}
                style={styles.submitBtn}
                buttonColor={styles.submitBtn.color}
                onPress={onSubmit}
            // disabled={disabled}
            >
                Submit
            </Button>
        </>
    )
}
const formColor = Colors.dark.background

const styles = StyleSheet.create({
    contactUsContent: {
        margin: 15,
        fontSize: 15,
        color: Colors.dark.text,
    },
    contactUsInput: {
        margin: 15,
    },
    contactUsMsg: {
        margin: 15,
        height: 150,
        justifyContent: "flex-start"
    },
    submitBtn: {
        margin: 15,
        height: 50,
        justifyContent: 'center',
        color: Colors.dark.title,
    },
    submitBtnLabel: {
        fontSize: 20,
        color: Colors.dark.background,
    },
    errorMsg: {
        marginLeft: 15,
    }
})

export default ContactUs;
