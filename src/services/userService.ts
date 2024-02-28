import { User } from "../models"
import { EpisodeInstance } from "../models/Episode"
import { UserCreationAttributes } from "../models/User"

function filterLastEpisodesByCourse(episodes: EpisodeInstance) {
    const coursesOnList: number[] = []

    const lastEpisodes = episodes.reduce((currentList: any[], episode: { courseId: number; order: number }) => {
        if (!coursesOnList.includes(episode.courseId)) {
          coursesOnList.push(episode.courseId)
          currentList.push(episode)
          return currentList
        }

        const episodeFromSameCourse = currentList.find((ep: { courseId: any }) => ep.courseId === episode.courseId)

        if (episodeFromSameCourse!.order > episode.order) return currentList

        const listWithoutEpisodeFromSameCourses = currentList.filter((ep: { courseId: any }) => ep.courseId !== episode.courseId)
        listWithoutEpisodeFromSameCourses.push(episode)

        return listWithoutEpisodeFromSameCourses
    }, [] as EpisodeInstance[])

    return lastEpisodes
}


export const userService = {
    findByEmail: async (email: string) => {
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        return user
    },

    create: async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes)
        return user
    },

    update: async (id: number, attributes: {
        firstName: string
        lastName: string
        phone: string
        birth: Date
        email: string
    }) => {
        const[affectedRows, updatedUsers] = await User.update(attributes, { where: { id }, returning: true})
        return updatedUsers[0]
    },

    getKeepWatchingList: async (id: number) => {
        const userWithWatchingEpisodes = await User.findByPk(id, {
            include: {
                association: 'Episodes',
                include: [{
                    association: 'Course'
                }],
                through: {
                    as: 'watchTime'
                }
            }
        })
        if (!userWithWatchingEpisodes) throw new Error('Usuário não encontrado.')

        const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!)

        return keepWatchingList


    }
}