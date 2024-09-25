from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
import pickle
import pandas as pd
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection string
mongo_uri = 'mongodb+srv://imalshamanjaree:vFXhxVeVZBrDt7TP@cluster1.deu3h.mongodb.net/house_value_db?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true'
client = MongoClient(mongo_uri)
db = client['house_value_db']  # Replace with your database name
users_collection = db['users']  # Collection for user data
predictions_collection = db['predictions']  # Collection for prediction data

# Load the trained model
model = pickle.load(open('./house_value_prediction_RF01.pickle', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the request
    data = request.json
    
    feature_names = [
        'OverallQual', 'YearBuilt', 'YearRemodAdd', 'TotalBsmtSF', 'stFlrSF',
        'GrLivArea', 'FullBath', 'TotRmsAbvGrd', 'GarageCars', 'GarageArea'
    ]
    
    # Convert the data into a DataFrame
    df = pd.DataFrame(data, index=[0], columns=feature_names)

    # Predict using the loaded model
    prediction = model.predict(df)
    
    # Return the prediction as a JSON response
    return jsonify({'SalePrice': prediction[0]})

@app.route('/save', methods=['POST'])
def save():
    data = request.json
    
    # Ensure that the required fields are present
    required_fields = [
        'OverallQual', 'YearBuilt', 'YearRemodAdd', 'TotalBsmtSF', 'stFlrSF',
        'GrLivArea', 'FullBath', 'TotRmsAbvGrd', 'GarageCars', 'GarageArea', 'SalePrice'
    ]
    
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing data fields'}), 400

    # Insert the data into MongoDB Atlas
    predictions_collection.insert_one(data)
    
    return jsonify({'message': 'Data saved successfully'}), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print("hiiii")
    # Extract user details from the request
    username = data.get('username')
    fullname = data.get('fullname')
    mobile = data.get('mobile')
    password = data.get('password')
    retype_password = data.get('retypePassword')
    print(username)
    print(fullname)
    print(mobile)
    print(password)
    print(retype_password)
    # Validate passwords match
    if password != retype_password:
        return jsonify({'error': 'Passwords do not match'}), 400
    print("true")
    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    print("false")
    # Save user to MongoDB
    user_data = {
        'username': username,
        'fullname': fullname,
        'mobile': mobile,
        'password': hashed_password.decode('utf-8')  # Store as a string
    }
    print(user_data)
    # Check if user already exists
    if users_collection.find_one({'mobile': mobile}):
        return jsonify({'error': 'User already exists'}), 400
    
    # Insert user into MongoDB
    users_collection.insert_one(user_data)

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    
    # Extract user details from the request
    mobile = data.get('mobile')
    password = data.get('password')
    
    # Fetch user from MongoDB
    user = users_collection.find_one({'mobile': mobile})
    if user is None:
        return jsonify({'error': 'Invalid mobile number or password'}), 401
    
    # Verify the password
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'error': 'Invalid mobile number or password'}), 401
    
    # Authentication successful, return success response with user data
    response_data = {
        'message': 'Login successful',
        'user': {
            'username': user.get('username'),
            'fullname': user.get('fullname'),
            'mobile': user.get('mobile')
        }
    }
    return jsonify(response_data), 200

@app.route('/predictions', methods=['GET'])
def get_predictions():
    
    mobile = request.args.get('mobile')
    
    if not mobile:
        return jsonify({'error': 'Mobile number is required'}), 400

    # Fetch predictions for the given mobile number
    predictions = list(predictions_collection.find({'mobile': mobile}))

    if not predictions:
        return jsonify({'error': 'No predictions found for this mobile number'}), 404
   
    # Convert the MongoDB documents to JSON serializable format
    for prediction in predictions:
        prediction['_id'] = str(prediction['_id'])

    return jsonify(predictions), 200


@app.route('/all-predictions', methods=['GET'])
def get_all_predictions():
    predictions = list(predictions_collection.find())
    
    if not predictions:
        return jsonify({'error': 'No predictions found'}), 404
    
    # Convert the MongoDB documents to JSON serializable format
    for prediction in predictions:
        prediction['_id'] = str(prediction['_id'])

    return jsonify(predictions), 200

@app.route('/users', methods=['GET'])
def get_users():
    users = list(users_collection.find({}))
    
    # Convert ObjectId to string
    for user in users:
        user['_id'] = str(user['_id'])
    
    return jsonify(users), 200

@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        # Convert user_id to ObjectId
        object_id = ObjectId(user_id)
        result = users_collection.delete_one({'_id': object_id})
        
        if result.deleted_count == 0:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        # Log the error for debugging
        app.logger.error(f"Error deleting user: {e}")
        return jsonify({'error': 'An error occurred while deleting the user'}), 500


if __name__ == '__main__':
    app.run(debug=True)
