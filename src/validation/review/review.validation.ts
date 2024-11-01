import { z } from "zod"
import validationErrorMessages from "../../constants/validationErrors"

const createReviewSchema = z.object({
    body: z.object({
        targetId: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("Target ID"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("Target ID")
            })
            .min(1, { message: validationErrorMessages.MISSING_ENTITY("Target ID") }),
        reviewerId: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("Reviewer ID"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("Reviewer ID")
            })
            .min(1, { message: validationErrorMessages.MISSING_ENTITY("Reviewer ID") }),
        targetType: z.enum(["product", "user"], {
            required_error: validationErrorMessages.MISSING_ENTITY("Target Type"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Target Type")
        }),
        reviewType: z.enum(["positive", "negative", "neutral"], {
            required_error: validationErrorMessages.MISSING_ENTITY("Review Type"),
            message: validationErrorMessages.INVALID_ENTITY("Review Type"),
            invalid_type_error: validationErrorMessages.INVALID_ENTITY("Review Type")
        }),
        rating: z
            .number({
                required_error: validationErrorMessages.MISSING_ENTITY("Rating"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("Rating")
            })
            .min(1, { message: validationErrorMessages.MIN_VALUE("Rating", 1) })
            .max(5, { message: validationErrorMessages.MAX_VALUE("Rating", 5) }),
        comment: z
            .string({
                required_error: validationErrorMessages.MISSING_ENTITY("Comment"),
                invalid_type_error: validationErrorMessages.INVALID_ENTITY("Comment")
            })
            .min(1, { message: validationErrorMessages.MISSING_ENTITY("Comment") })
    })
})

export default createReviewSchema

export type TCreateReview = z.TypeOf<typeof createReviewSchema>
