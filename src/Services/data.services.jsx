const API_BASE_URL = process.env.REACT_APP_APIURL;

export const saveMember = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/member/savemember`, {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to save member');
  }
  return result;
};

export const getAllMembers = async () => {
  const response = await fetch(`${API_BASE_URL}/member/getallmember`);
  return response.json();
};

export const getMemberById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/member/getmemberbyid/${id}`);
  return response.json();
};

export const getAllmembername = async () => {
  const response = await fetch(`${API_BASE_URL}/member/getmemberidandname`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch member');
  }
  return data;
};

export const deleteMember = async (id) => {
  const response = await fetch(`${API_BASE_URL}/member/deletemember/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const updateMember = async (id, formData) => {
  const response = await fetch(`${API_BASE_URL}/member/updatemember/${id}`, {
    method: 'PUT',
    body: formData,
  });
  return response.json();
};

export const getExpiredMembers = async () => {
  try {
  const response = await fetch(`${API_BASE_URL}/members/expired`);
  if (!response.ok) {
    throw new Error('Failed to fetch expired members');
  }
  return response.json(); // Ensure the response is parsed as JSON
} catch (error) {
  console.error('Error fetching expired members:', error);
  return { expiredCount: 0, expiredMembers: [] }; // Default fallback
}}


export const getAllPackages = async () => {
  const response = await fetch(`${API_BASE_URL}/package/getallpackage`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch packages');
  }
  return data;
};

export const getAllStaffname = async () => {
  const response = await fetch(`${API_BASE_URL}/staff/getstaffnameandid`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch staff');
  }
  return data;
};

export const savePackage = async (packageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/package/savepackage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(packageData),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to save package');
    }
    return result;
  } catch (error) {
    throw new Error(`Error saving package: ${error.message}`);
  }
};

export const updatePackage = async (id, packageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/package/updatepackage/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(packageData),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update package');
    }
    return result;
  } catch (error) {
    throw new Error(`Error updating package: ${error.message}`);
  }
};

export const deletePackage = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/package/deletepackage/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete package');
    }
    return result;
  } catch (error) {
    throw new Error(`Error deleting package: ${error.message}`);
  }
};


export const getAllStaffs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/getallstaff`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch staff');
    }
    return result.staffs;  // Return the staff array directly
  } catch (error) {
    throw new Error(`Error fetching staff: ${error.message}`);
  }
};

export const saveStaff = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/staff/savestaff`, {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to save staff');
  }
  return result;
};

export const getStaffById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/getstaffbyid/${id}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch staff details');
    }
    return result.staff;
  } catch (error) {
    throw new Error(`Error fetching staff details: ${error.message}`);
  }
};

export const deleteStaff = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/deletestaff/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete staff');
    }
    return result;
  } catch (error) {
    throw new Error(`Error deleting staff: ${error.message}`);
  }
};

export const updateStaff = async (id, formData) => {
  const response = await fetch(`${API_BASE_URL}/staff/updatestaff/${id}`, {
    method: 'PUT',
    body: formData,
  });
  return response.json();
};

export const getAttendanceWithDetails = async () => {
  const response = await fetch(`${API_BASE_URL}/attendance/attendancewithdetails`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch attendance data');
  }
  return result.data;
};

export const getStaffAttendanceWithDetails = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/staffattendance`);
    const result = await response.json();
    if (result.code !== 200) {
      throw new Error(result.message || 'Failed to fetch staff attendance data');
    }
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching staff attendance data: ${error.message}`);
  }
};

export const getmemberLatestAttendance = async (input) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/latest/${input}`, {
      method: 'GET',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch latest attendance');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching latest attendance:', error.message || error);
    throw error;
  }
};

export const getIrregularMemberCount = async (month, year) => {
  try {
    const response = await fetch(`${API_BASE_URL}/irregular-member-count/${month}/${year}`);
    
    // Parse the JSON from the response
    const data = await response.json();

    // Ensure the returned data matches your backend's structure
    return data; // Assuming data contains the irregularCount
  } catch (error) {
    console.error('Error fetching irregular member count:', error);
    throw error;
  }
};


export const getStaffLatestAttendance = async (input) => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/latestattendance/${input}`, {
      method: 'GET',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch latest attendance');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching latest attendance:', error.message || error);
    throw error;
  }
};

export const savememberAttendance = async (attendanceData) => {
  const response = await fetch(`${API_BASE_URL}/attendance/saveattendance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: attendanceData }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to save attendance');
  }
  return result;
};

export const saveStaffAttendance = async (attendanceData) => {
  const response = await fetch(`${API_BASE_URL}/staff/savestaffattendance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: attendanceData }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to save attendance');
  }
  return result;
};

export const updatememberAttendanceOutTime = async (input) => {
  const response = await fetch(`${API_BASE_URL}/attendance/updateouttime`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input, latestOnly: true }), // Correctly structure the body
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to update attendance out time');
  }
  return result;
};

export const updateStaffAttendanceOutTime = async (input) => {
  const response = await fetch(`${API_BASE_URL}/staff/updateouttime`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input, latestOnly: true }), // Correctly structure the body
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to update staff attendance out time');
  }
  return result;
};

export const getallLatestPayment = async () => {
  const response = await fetch(`${API_BASE_URL}/payment/getallLatestpayment`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch payment');
  }
  return data;
};

export const getPaymentByMemberID = async (memberID) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/getPayment/${memberID}`, {
      method: 'GET',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch latest payment');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching latest payment:', error.message || error);
    throw error;
  }
};

export const savePayment = async (id, paymentData) => {
  const response = await fetch(`${API_BASE_URL}/payment/savepayment/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Failed to save payment');
  }
  return result;
};

export const getallPaymentDetails = async () => {
  const response = await fetch(`${API_BASE_URL}/payment/getallpayments`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch payment');
  }
  return data;
};

export const getLatestPayment = async (memberID) => {
  const response = await fetch(`${API_BASE_URL}/payment/getlatestpayment/${memberID}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch payment');
  }
  return data;
};

export const getPendingPayments = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}/payments/pending`);
      if (!response.ok) {
          throw new Error('Failed to fetch pending payments');
      }
      return await response.json();
  } catch (error) {
      console.error("Error in getPendingPayments:", error.message);
      throw error;
  }
};


export const saveEnquiry = async (enquiryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiry/saveEnquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enquiryData)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to save enquiry');
    }

    return result;
  } catch (error) {
    console.error('Error saving enquiry:', error);
    throw error;
  }
};

export const updateEnquiry = async (id, enquiryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiry/updateEnquiry/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enquiryData)
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update enquiry');
    }

    return result;
  } catch (error) {
    console.error('Error updating enquiry:', error);
    throw error;
  }
};

export const getallEnquiries = async () => {
  const response = await fetch(`${API_BASE_URL}/enquiry/getallEnquiry`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch Enquiries');
  }
  return data;
};

export const getEnquirybyId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/enquiry/getEnquirybyId/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch enquiry');
  }
  return data;
};

export const deleteEnquiry = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/enquiry/deleteEnquiry/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete enquiry');
    }

    return result;
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    throw error;
  }
};

export const getEnquiryCount = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}/enquiry/count`);
      if (!response.ok) {
          throw new Error('Failed to fetch enquiry count');
      }
      return await response.json();
  } catch (error) {
      console.error('Error in getEnquiryCount:', error.message);
      throw error;
  }
};



export const getallDietPlans = async () => {
  const response = await fetch(`${API_BASE_URL}/diet/getallDietplan`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch Dietplans');
  }
  return data;
};

export const getDietplanbyId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/diet/getDietbyId/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch Diet Plan');
  }
  return data;
};

export const saveDietPlan = async (dietData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/diet/saveDiet`, {
      method: 'POST',
      body: dietData
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to save dietPlan');
    }

    return result;
  } catch (error) {
    console.error('Error saving dietPlan:', error);
    throw error;
  }
};

export const updateDietPlan = async (id, dietData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/diet/updateDiet/${id}`, {
      method: 'PUT',
      body: dietData
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update dietPlan');
    }

    return result;
  } catch (error) {
    console.error('Error updating dietPlan:', error);
    throw error;
  }
};

export const deleteDietPlan = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/diet/deleteDietplan/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete dietPlan');
    }

    return result;
  } catch (error) {
    console.error('Error deleting dietPlan:', error);
    throw error;
  }
};

export const getDashboardStats = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard/getdashboardCounts`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch Values');
  }
  return data;
};

export const getStaffAttendancebyMonth = async (month, year) => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/getattendanceBymonthandYear/${month}/${year}`);
    const result = await response.json();
    console.log('Staff Attendance Response:', result); // Log the full response for debugging
    if (result.code !== 200 || !result.data) {
      throw new Error(result.message || 'Failed to fetch staff attendance data');
    }
    return result.data;
  } catch (error) {
    console.error('Error fetching staff attendance:', error);
    throw new Error(`Error fetching staff attendance data: ${error.message}`);
  }
};

export const getMemberAttendancebyMonth = async (month, year) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attendance/getattendanceByMonth/${month}/${year}`);
    const result = await response.json();
    console.log('Member Attendance Response:', result); // Log the full response for debugging
    if (result.code !== 200 || !result.member) {
      throw new Error(result.message || 'Failed to fetch member attendance data');
    }
    return result.member;
  } catch (error) {
    console.error('Error fetching member attendance:', error);
    throw new Error(`Error fetching member attendance data: ${error.message}`);
  }
};

export const getallExercisePlans = async () => {
  const response = await fetch(`${API_BASE_URL}/exercise/getallExercisePlans`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch Exercise Plans');
  }
  return data;
};

export const getExerciseplanbyId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/exercise/getExercisebyId/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch Exercise Plan');
  }
  return data;
};
export const saveExercisePlan = async (exerciseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/exercise/saveExercise`, {
      method: 'POST',
      body: exerciseData
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to save Exercise Plan');
    }

    return result;
  } catch (error) {
    console.error('Error saving Exercise plan:', error);
    throw error;
  }
};

export const updateExercisePlan = async (id, exerciseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/exercise/updateExercise/${id}`, {
      method: 'PUT',
      body: exerciseData
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update Exercise Plan');
    }

    return result;
  } catch (error) {
    console.error('Error updating Exercise Plan:', error);
    throw error;
  }
};

export const deleteExercisePlan = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/exercise/deleteExercise/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete Exercise Plan');
    }

    return result;
  } catch (error) {
    console.error('Error deleting excerise plan:', error);
    throw error;
  }
};

export const getallExpenses = async () => {
  const response = await fetch(`${API_BASE_URL}/expense/getallExpenses`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch Expenses');
  }
  return data;
};

export const getExpensebyId = async (id) => {
  const response = await fetch(`${API_BASE_URL}/expense/getExpensebyId/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch Expemse');
  }
  return data;
};

export const saveExpense = async (expenseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expense/saveExpense`, {
      method: 'POST',
      body: expenseData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to save Expense');
    }

    return result;
  } catch (error) {
    console.error('Error saving expense:', error);
    throw error;
  }
};



export const updateExpense = async (id, expenseData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expense/updateExpense/${id}`, {
      method: 'PUT',
      body: expenseData
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update expense');
    }

    return result;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/expense/deleteExpense/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete expense');
    }

    return result;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};