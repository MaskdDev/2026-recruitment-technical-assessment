use axum::{http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};

pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {
    // Initialise string length and integer sum
    let mut string_len: usize = 0;
    let mut int_sum: i32 = 0;

    // Iterate over request data, incrementing length and sum.
    for value in request.data {
        match value {
            DataValue::Str(string_value) => string_len += string_value.len(),
            DataValue::Int(int_value) => int_sum += int_value,
        }
    }

    // Create and return response
    let response = DataResponse {
        string_len,
        int_sum,
    };
    (StatusCode::OK, Json(response))
}

/// An enum representing the value of data provided in the data array.
#[derive(Deserialize)]
#[serde(untagged)]
pub enum DataValue {
    Str(String),
    Int(i32),
}

/// An enum representing an incoming request with data.
#[derive(Deserialize)]
pub struct DataRequest {
    /// A vector of data values to process.
    data: Vec<DataValue>,
}

#[derive(Serialize)]
pub struct DataResponse {
    /// The total length of all the strings provided in the request.
    string_len: usize,

    /// The sum of all the integers provided in the request.
    int_sum: i32,
}
