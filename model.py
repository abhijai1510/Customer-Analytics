# Customer Segmentation Using TensorFlow

## Setup and Imports
import pandas as pd
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib

%matplotlib inline

## 1. Data Loading and Preprocessing
def load_data(file_path):
    df = pd.read_csv(file_path)
    print("Dataset Shape:", df.shape)
    return df

# Load the data
df = load_data('customers.csv')
df.head()

## 2. Feature Engineering
def prepare_features(df):
    # Convert registration date to days since registration
    df['registered'] = pd.to_datetime(df['registered'])
    df['days_registered'] = (pd.Timestamp.now() - df['registered']).dt.days
    
    # Create normalized features
    features = [
        'age',
        'spent',
        'orders',
        'days_registered',
        'is_married'
    ]
    
    # Create the feature matrix
    X = df[features].copy()
    
    # Normalize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, features, scaler

X, feature_names, scaler = prepare_features(df)

## 3. Model Definition
def create_model(input_shape):
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(32, activation='relu', input_shape=[input_shape]),
        tf.keras.layers.Dense(16, activation='relu'),
        tf.keras.layers.Dense(4, activation='softmax')
    ])
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

model = create_model(X.shape[1])
model.summary()

## 4. Training the Model
# Since this is unsupervised learning, well use the model to create initial predictions
initial_predictions = model.predict(X)
y = tf.keras.utils.to_categorical(np.argmax(initial_predictions, axis=1))

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
history = model.fit(
    X_train, y_train,
    epochs=50,
    batch_size=32,
    validation_data=(X_test, y_test),
    verbose=1
)

## 5. Visualizing Training Results
def plot_training_history(history):
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))
    
    # Plot loss
    ax1.plot(history.history['loss'], label='Training Loss')
    ax1.plot(history.history['val_loss'], label='Validation Loss')
    ax1.set_title('Model Loss')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Loss')
    ax1.legend()
    
    # Plot accuracy
    ax2.plot(history.history['accuracy'], label='Training Accuracy')
    ax2.plot(history.history['val_accuracy'], label='Validation Accuracy')
    ax2.set_title('Model Accuracy')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Accuracy')
    ax2.legend()
    
    plt.tight_layout()
    plt.show()

plot_training_history(history)

## 6. Customer Segmentation Analysis
def analyze_segments(df, predictions):
    # Get segment assignments
    segments = np.argmax(predictions, axis=1)
    df['segment'] = segments
    
    # Analyze each segment
    segment_analysis = []
    for segment in range(4):
        segment_df = df[df['segment'] == segment]
        
        analysis = {
            'Segment': f'Segment {segment}',
            'Size': len(segment_df),
            'Avg Age': segment_df['age'].mean(),
            'Avg Spent': segment_df['spent'].mean(),
            'Avg Orders': segment_df['orders'].mean(),
            'Marriage Rate': segment_df['is_married'].mean() * 100,
            'Common Jobs': segment_df['job'].value_counts().head(3).index.tolist(),
            'Common Hobbies': segment_df['hobbies'].value_counts().head(3).index.tolist()
        }
        segment_analysis.append(analysis)
    
    return pd.DataFrame(segment_analysis)

# Get predictions for all customers
predictions = model.predict(X)
segment_analysis = analyze_segments(df, predictions)
display(segment_analysis)

## 7. Visualizing Segments
def plot_segment_characteristics(df):
    fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2, figsize=(15, 15))
    
    # Age distribution by segment
    sns.boxplot(x='segment', y='age', data=df, ax=ax1)
    ax1.set_title('Age Distribution by Segment')
    
    # Spending distribution by segment
    sns.boxplot(x='segment', y='spent', data=df, ax=ax2)
    ax2.set_title('Spending Distribution by Segment')
    
    # Orders distribution by segment
    sns.boxplot(x='segment', y='orders', data=df, ax=ax3)
    ax3.set_title('Orders Distribution by Segment')
    
    # Marriage rate by segment
    marriage_rate = df.groupby('segment')['is_married'].mean() * 100
    marriage_rate.plot(kind='bar', ax=ax4)
    ax4.set_title('Marriage Rate by Segment (%)')
    
    plt.tight_layout()
    plt.show()

plot_segment_characteristics(df)

## 8. Save the Model
# Save the model
model.save('customer_segmentation_model')

# Save the scaler and feature names
joblib.dump(scaler, 'feature_scaler.joblib')

# Save feature names
with open('feature_names.txt', 'w') as f:
    f.write('\n'.join(feature_names))

## 9. Function to Predict Segment for New Customers
def predict_segment_for_customer(customer_data, model, scaler, feature_names):
    # Prepare customer data
    customer_features = pd.DataFrame([customer_data], columns=feature_names)
    
    # Scale features
    scaled_features = scaler.transform(customer_features)
    
    # Make prediction
    prediction = model.predict(scaled_features)
    segment = np.argmax(prediction[0])
    
    return segment

# Example usage
new_customer = {
    'age': 35,
    'spent': 1500,
    'orders': 10,
    'days_registered': 180,
    'is_married': 1
}

segment = predict_segment_for_customer(new_customer, model, scaler, feature_names)
print(f"Predicted segment for new customer: {segment}")

## 10. Model Interpretation
def plot_feature_importance(model, feature_names):
    # Get weights from the first layer
    weights = model.layers[0].get_weights()[0]
    
    # Calculate feature importance as the mean absolute weight for each feature
    importance = np.mean(np.abs(weights), axis=1)
    
    # Create a DataFrame for plotting
    importance_df = pd.DataFrame({
        'Feature': feature_names,
        'Importance': importance
    }).sort_values('Importance', ascending=True)
    
    # Plot
    plt.figure(figsize=(10, 6))
    sns.barplot(x='Importance', y='Feature', data=importance_df)
    plt.title('Feature Importance')
    plt.show()

plot_feature_importance(model, feature_names)

