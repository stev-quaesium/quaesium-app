import Quiz from "./Quiz"
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

export default function Dashboard() {

    const [setId, setSetId] = useState(0)

    return (
        <Link to={`/quiz/${setId}`}>Quiz</Link>
    )
}