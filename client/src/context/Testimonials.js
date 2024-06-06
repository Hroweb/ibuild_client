export const testimonials = [
    {
        id: 1,
        description: 'GREAT JOB! We thought the quality was fantastic, the team were great and everything was produced how we wanted. This was a hugely important event for us. Thank you for ensuring delivery. We knew you were the right one for the job. You showed us this throughout the preparation before. Our requests were always answered very promptly, leaving nothing out and always very communicative.',
        avatar: '/images/per-sundell.png',
        name: 'Per Sundell',
        designation: 'Senior Business Development Manager ',
        logo_src: '/testimonials/bambora-tst.svg',
        logo_alt: 'Bambora'
    },
    {
        id: 2,
        description: 'Thank you to all your team for the design work on our stand for ICE 2019. The stand looked professional and we received positive feedback from attendees and our own management. All works coordination and adaptation to our brands ran smoothly. This is not the first time we have worked together and look forward to work with you again in the future. Thank you once again, from all the Helio team.',
        avatar: '/images/richard-mifsud.png',
        name: 'Richard Mifsud',
        designation: 'Chief Executive Officer',
        logo_src: '/testimonials/helio-tst.svg',
        logo_alt: 'Helio Gaming'
    },
    {
        id: 3,
        description: 'Now things have settled a little following last year’s Malta Blockchain Summit, I wanted to say thank you so much for an excellent job on our stand design and Build. We were very pleased, not least because we didn’t have to do a thing. This was our first collaboration, but certainly will not be the last, as our expectations were not only reached but exceeded.',
        avatar: '/images/oliver-marco-la-rosa.png',
        name: 'Oliver Marco La Rosa',
        designation: 'Chief Executive Officer',
        logo_src: '/testimonials/globiance-tst.svg',
        logo_alt: 'Globiance'
    },
]

export function getRandomTestimonials(count = 3, excludeId = false) {
    const sortedTestimonials = [...testimonials].sort((a, b) => new Date(b.id) - new Date(a.id));
    if (excludeId) {
        // Find the index of the article with the specified ID
        const excludedIndex = sortedTestimonials.findIndex((testimonial) => testimonial.id === excludeId);

        // If the article with the specified ID is found, remove it from the sortedArticles array
        if (excludedIndex !== -1) {
            sortedTestimonials.splice(excludedIndex, 1);
        }
    }
    const shuffledTestimonials = [...sortedTestimonials].sort(() => 0.5 - Math.random()); // Shuffle the array randomly
    // Get the last 3 news articles
    return shuffledTestimonials.slice(0, count);

}