

import { Request, Response } from 'express';
import { converter } from '../models/converter';
import { db } from '../database';
import IBaseService from '../interfaces/IBaseService';
import IRoom from '../models/room.model';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { viewFloorHelper } from './floor.controller';
import { subjectCollection, viewSubject } from './subject.controller';
import ISubject from '../models/subject.model';

export const roomCollection = db.collection("/Room/").withConverter(converter<IRoom>())

class RoomService implements IBaseService {
    public async add(req: Request<ParamsDictionary, any, IRoom, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await roomCollection.doc().set({
            ...req.body,
            FLR_ID: db.doc(`/Floor/${req.body.FLR_ID}`)
        })
            .then(() => {
                res.status(200).json("Room added successfully!")
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async  update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async  delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async view(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        const { id } = req.params
        
        await viewRoom.view(id)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((error) => {
                res.status(400).json(error)
            })
    }
    public async viewAll(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await roomCollection.get()
            .then((roomDoc) => {
                const roomMap = roomDoc.docs.map((doc) => {
                    return viewRoom.viewWithData(doc.id, doc.data() as IRoom)
                })

                return Promise.all(roomMap)
                    .then((rooms) => {
                        res.status(200).json(rooms)
                    })
                    .catch((error) => {
                        return Promise.reject(error)
                    })
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error.message)
            })
    }
    public async viewAssignedSubjects(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        await roomCollection.get()
            .then((roomDoc) => {
                const roomMap = roomDoc.docs.map((doc) => {
                    return viewRoom.viewWithData(doc.id, doc.data() as IRoom)
                })

                return Promise.all(roomMap)
                    .then((rooms) => {
                        res.status(200).json(rooms)
                    })
                    .catch((error) => {
                        return Promise.reject(error)
                    })
            })
            .catch((error) => {
                console.error(error)
                res.status(400).json(error.message)
            })
    }
}

class ViewRoom {
    public async view (id: string): Promise<IRoom> {
        const room = await roomCollection.doc(id).get()
        const floor = await viewFloorHelper((room.data() as IRoom).FLR_ID as string)
    
        return ({
            ROOM_ID: id,
            ROOM_NAME: (room.data() as IRoom).ROOM_NAME,
            FLR_ID: floor
        })
    }

    public async viewAssignedSubjects (id: string): Promise<Array<ISubject>> {
        const room = await roomCollection.doc(id).get()

        const assignedSubjects = await subjectCollection.where('ROOM_ID', '==', room.id).get()

        const subjects = assignedSubjects.docs.map((subject) => {
            return viewSubject.viewWithData(subject.id, subject.data() as ISubject)
        })

        return Promise.all(subjects)
            .then((result => result))
            .catch((error) => Promise.reject(error))
    }

    public async viewWithData (id: string, room: IRoom): Promise<IRoom> {
        const floor = await viewFloorHelper(room.FLR_ID as string)
    
        return ({
            ROOM_ID: id,
            ROOM_NAME: room.ROOM_NAME,
            FLR_ID: floor
        })
    }

    public async viewWithDataAndAssignedSubjects (id: string, room: IRoom): Promise<Array<ISubject>> {
        const assignedSubjects = await subjectCollection.where('ROOM_ID', '==', room.ROOM_ID).get()

        const subjects = assignedSubjects.docs.map((subject) => {
            return viewSubject.viewWithData(subject.id, subject.data() as ISubject)
        })

        return Promise.all(subjects)
            .then((result => result))
            .catch((error) => Promise.reject(error))
    }
}

export const viewRoom = new ViewRoom
export default new RoomService