import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
    storage: {
        kind: "local"
    },
    singletons: {
        testimonial: singleton({
            label: "Testimonial Section",
            path: "src/content/keystatic/testimonialSection",
            schema: {}
        })
    }
});