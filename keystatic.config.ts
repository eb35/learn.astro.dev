import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: "local"
    },
    singletons: {
        testimonial: singleton({
            label: "Testimonial Section",
            path: "src/content/keystatic/testimonialSection",
            format: { data: "yaml" },
            schema: {
                heading: fields.object({
                    tag: fields.select({
                        label: "HTML Tag",
                        options: [
                            {
                                label: "h1",
                                value: "h1",
                            },
                            {
                                label: "h2",
                                value: "h2",
                            },
                            {
                                label: "h3",
                                value: "h3",
                            },
                            {
                                label: "h4",
                                value: "h4",
                            },
                            {
                                label: "h5",
                                value: "h5",
                            },
                            {
                                label: "h6",
                                value: "h6",
                            },
                        ],
                        defaultValue: "h1",
                    }),
                    text: fields.text({
                        label: "Heading Text",
                        validation: {
                            isRequired: true
                        }
                    })
                })
            }
        })
    }
});