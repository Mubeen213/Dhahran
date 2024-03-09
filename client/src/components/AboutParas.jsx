const aboutStatements = [
    {
        id: 1,
        subHeading: 'Our Story',
        content: 'Welcome to Dhahran E-Landry, where the fusion of innovation and laundry expertise meets your convenience. Our journey began with a simple idea: to revolutionize the way you experience laundry services. Founded in 2024, we embarked on a mission to simplify and enhance the laundry process for individuals and families alike.'
    },
    {
        id: 2,
        subHeading: 'Our Mission',
        content: 'At Dhahran E-Landry, our mission is clear - to provide you with a seamless and reliable laundry experience while upholding the highest standards of quality and customer satisfaction. We believe in making laundry day stress-free, leaving you with more time for what matters most in your life.'
    },
    {
        id: 3,
        subHeading: 'Services We Offer',
        content: 'Discover the range of services that set us apart. From cutting-edge technology to eco-friendly practices, we tailor our offerings to meet your unique needs. Whether it\'s dry cleaning, wash and fold, or specialized treatments, we\'ve got you covered.'
    },
    {
        id: 4,
        subHeading: 'Our Commitment to Quality',
        content: 'Your clothes are more than just fabric; they represent your style and personality. That\'s why we\'ve implemented rigorous quality control measures to ensure that every item entrusted to us is handled with the utmost care and attention to detail.'
    },
    {
        id: 5,
        subHeading: 'Embracing Innovation',
        content: 'Dhahran E-Landry embraces the latest technologies to make your laundry experience efficient and enjoyable. Our state-of-the-art facilities and user-friendly app ensure that managing your laundry is as easy as a few taps on your smartphone.'
    },
    {
        id: 6,
        subHeading: 'Contact Us',
        content: 'Have a question, suggestion, or just want to say hello? We\'d love to hear from you! Reach out to our dedicated customer support team at ehtesham@gmail.com Thank you for choosing Dhahran E-Landry – where convenience, quality, and care come together for a laundry experience like no other.'
    },
]

export const AboutParas = () =>{

    return (
        <>
            {
                aboutStatements.map((about) => {
                    const {id, subHeading, content} = about;

                    return (
                        <p className= 'mt-4 text-lg leading-6' key={id}>
                            <span className= 'font-bold block text-2xl mb-4'>{subHeading}</span>
                            {content}
                        </p>
                    )
                })
            }
        </>
    )
}