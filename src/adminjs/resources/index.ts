import { ResourceWithOptions } from "adminjs";
import { categoryResourceOptions } from "./category";
import { Category, Course } from "../../models";
import { courseResourceOptions } from "./course";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    },
    {
        resource: Course,
        options: courseResourceOptions
    }
]