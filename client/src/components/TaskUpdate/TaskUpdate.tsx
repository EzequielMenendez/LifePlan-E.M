import { useForm } from "react-hook-form"
import { Task } from "../../types"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { updateTask } from "../../redux/actions"
dayjs.extend(utc)

const TaskUpdate = (props:any) => {
    const {id, task} = props
    const dispatch = useDispatch()
    const {register, handleSubmit, formState:{errors}, setValue} = useForm()
    const [ startDate, setStartDate ] = useState(new Date(task.startDate))
    const [ endDate, setEndDate ] = useState(new Date(task.endDate))
    const [ minDate, _setMinDate ] = useState(new Date())

    useEffect(()=> {
        setValue('title', task.title)
    }, [])

    const onSubmit = (async(data:Task)=>{
        const values:Task = {
            title: data.title,
            startDate: dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss"),
            endDate: dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss")
        }
        dispatch(updateTask(id, values) as any)
    })

    const onChangeStart = (date:Date) => {
        setStartDate(date)
    }

    const onChangeEnd = (date:Date) => {
        setEndDate(date)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                type="title"
                id="title"
                {...register('title', {
                    required: 'Title is required',
                })}
                placeholder="Title"
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                />
                {errors.title && <p className='text-red-500'>Title is required</p>}
                <DatePicker
                selected={startDate}
                onChange={(date:Date) => onChangeStart(date)}
                withPortal
                showTimeSelect
                minDate={minDate}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="text-black"
                />

                <DatePicker 
                selected={endDate}
                onChange={(date:Date) => onChangeEnd(date)}
                withPortal
                showTimeSelect
                minDate={startDate}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="text-black"
                />
                <button type='submit'>Update Task</button>
            </form>
        </div>
    )
}

export default TaskUpdate