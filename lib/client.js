import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'pngw7pnr',
    dataset: 'production',
    apiVersion: '2022-10-26',
    useCdn: true,
    token: 'skaAL4N2HxML4DrJVeiE8yhEqfVBbV15rG28sjRvgOjOZhUwbEYYINqw9i0hKyr4UpLqp9BL3dwanSEYYUlpiNiQYgXNdK8AlaEY8AjaptxVRTCTnasz7tFZZCbSZMpSheRxvv3Ccs55qEFqWYi4SbjYpsJo4qfQGqKXT92o8wvX6hKt6gvT'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);