import { WithContext } from './WithContext'

export const WithStatus = ( status = 200 ) => WithContext((context)=>context.status = status )

export const WithStatusNotFound = WithStatus(404)

export default WithStatus