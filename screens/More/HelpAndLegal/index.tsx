import { List } from 'react-native-paper'
import React from "react";
import {
    StyleSheet,
} from "react-native";
import { Disclaimer, FAQ, disclaimers, faqs } from '../../../data';
import Colors from '../../../constants/Colors';

const HelpAndLegal = () => {
    const fqasView = faqs.map((faq: FAQ) =>
        <List.Accordion key={faq.id} title={faq.question} titleNumberOfLines={5} titleStyle={styles.accordionTitle}
            style={styles.accordionStyle}>
            <List.Item title="" description={faq.anwser} descriptionNumberOfLines={10} descriptionStyle={styles.accordionDescription} />
        </List.Accordion>
    )

    const disclaimersView = disclaimers.map((disclaimer: Disclaimer) =>
        <List.Item key={disclaimer.id} title="" description={`\u2022 ${disclaimer.content}`} descriptionStyle={styles.description}
            descriptionNumberOfLines={10} />
    )

    return (
        <>
            <List.Section title="FAQs" titleStyle={styles.title}>
                {fqasView}
            </List.Section>

            <List.Section title="Disclaimer" titleStyle={styles.title}>
                {disclaimersView}
            </List.Section>
        </>
    )
}

const styles = StyleSheet.create({
    accordionStyle: {
        backgroundColor: Colors.dark.background
    },
    accordionTitle: {
        color: Colors.dark.text,
        backgroundColor: Colors.dark.background
    },
    accordionDescription: {
        color: Colors.dark.text,
    },
    title: {
        color: Colors.dark.title,
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        color: Colors.dark.text,
        marginLeft: 10,
    }
});

export default HelpAndLegal;