export interface FAQ {
    id: string;
    question: string;
    anwser: string;
}

export interface Disclaimer {
    id: string,
    content: string;
}

export const aboutUsContent: string = `The Anti-Asian Hate Crime Tracker is a project created and maintained by 1 Thing Against Racism. Find us on social media or visit 1 Thing Against Racism’s website to learn more about the organization and how you can contribute to our efforts against racism.`;

export const contactUsContent: string = `Do you have feedback you’d like to leave us? Have ideas for how we can make the app better? We’re always looking to improve as an organization.`;

export const disclaimers: Disclaimer[] = [
    {
        id: "1",
        content: `The Anti-Asian Hate Crime Tracker website is created and maintained by a group of volunteers, for the sole purpose of raising the awareness of anti-Asian behavior that is happening on a daily basis.`
    },
    {
        id: "2",
        content: `We collect anti-Asian incidents from online public sources and provide hyperlinks (accompanied by titles and brief excerpts of the reports) that direct you to the original sources of information. We believe our use of any copyrighted materials is permitted as “fair use” under 17 U.S.C. § 107. If you have any questions or concerns with any such use, please contact us here.`
    },
    {
        id: "3",
        content: `We collect and aggregate the data with our best effort. The information herein is provided with the understanding that we are not engaged in rendering legal or other professional advice or services. In no event shall we be liable for any consequences whatsoever arising out of or in connection with your access to or use of the website.`
    }
]


export const faqs: FAQ[] = [
    {
        id: "1",
        question: "Where does the hate crime data come from?",
        anwser: "Todo"
    },
    {
        id: "2",
        question: "Is there a way to get historical data?",
        anwser: "Todo"
    },
    {
        id: "3",
        question: "Why does the tracker only track anti-Asian crime?",
        anwser: "Todo"
    },
    {
        id: "4",
        question: "Can I volunteer with 1Thing Against Racism?",
        anwser: "Todo"
    },
]
