import { Favorite } from "../models"

export const favoriteService = {
    findByUserId: async (userId: number) => {
        const favorites = Favorite.findAll({
            attributes: [['user_id', 'userId']],
            where: { userId },
            include: {
                association: 'Course',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        })

        return {
            userId,
            courses: (await favorites).map(favorite => favorite.Course)
        }
    },

    create: async (userId: number, courseId: number) => {
        const favorite = Favorite.create({
            courseId,
            userId
        })
        return favorite
    },

    delete: async (userId: number, courseId: number) => {
        await Favorite.destroy({
            where: {
                userId,
                courseId
            }
        })
    },

    isFavorited: async (userId: number, courseId: number) => {
        const favorite = Favorite.findOne({
            where: {
                userId,
                courseId
            }
        })

        return favorite !== null ? true : false
    }

}