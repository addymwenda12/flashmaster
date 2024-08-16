import { db } from '../firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';

const studySessionsCollection = collection(db, 'studySessions');

async function getStudyProgress(userId) {
  if (!userId) {
    throw new Error('Invalid input: User ID is required');
  }

  try {
    const q = query(studySessionsCollection, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const sessions = snapshot.docs.map((doc) => doc.data());

    // Calculate total study time in hours and days
    let totalHours = 0;
    const dailyStudyTime = {};

    sessions.forEach((session) => {
      const startTime = moment(session.startTime.toDate());
      const endTime = moment(session.endTime.toDate());
      const duration = moment.duration(endTime.diff(startTime));
      const hours = duration.asHours();

      totalHours += hours;

      const day = startTime.format("YYYY-MM-DD");
      if (!dailyStudyTime[day]) {
        dailyStudyTime[day] = 0;
      }
      dailyStudyTime[day] += hours;
    });

    const totalDays = Object.keys(dailyStudyTime).length;
    // Prepare data for line graph
    const lineGraphData = Object.keys(dailyStudyTime).map((day) => ({
      day,
      hours: dailyStudyTime[day],
    }));

    return {
      totalHours,
      totalDays,
      lineGraphData,
    };
  } catch (error) {
    console.error('Error getting study progress:', error);
    throw error;
  }
}

export default {
  getStudyProgress,
};