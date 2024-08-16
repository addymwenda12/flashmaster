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

async function getDailyStudyStreak(userId) {
  if (!userId) {
    throw new Error('Invalid input: User ID is required');
  }

  try {
    const q = query(studySessionsCollection, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const sessions = snapshot.docs.map((doc) => doc.data());

    // Calculate daily study streaks
    const streaks = calculateStreaks(sessions);
    return streaks;
  } catch (error) {
    console.error("Error getting daily study streaks:", error);
    throw error;
  }
}

function calculateStreaks(sessions) {
  if (!sessions.length) return 0;

  // Sort sessions by date
  sessions.sort((a, b) => new Date(a.date) - new Date(b.date));

  let streak = 1;
  let maxStreak = 1;

  for (let i = 1; i < sessions.length; i++) {
    const currentDate = new Date(sessions[i].date);
    const previousDate = new Date(sessions[i - 1].date);

    // Check if the current session is the next day of the previous session
    if ((currentDate - previousDate) / (1000 * 60 * 60 * 24) === 1) {
      streak++;
      maxStreak = Math.max(maxStreak, streak);
    } else if ((currentDate - previousDate) / (1000 * 60 * 60 * 24) > 1) {
      streak = 1;
    }
  }

  return maxStreak;
}

export default {
  getStudyProgress,
  getDailyStudyStreak,
};