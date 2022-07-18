import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Tab } from "@mui/material";
import { Link } from 'react-router-dom'
import { CardContent, Card } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { bloodCount } from "../../redux/actions/donorAction";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    todoStyle: {
        margin: "20px auto",
        padding: "20px",
        border: "2px solid #bdbdbd",
        borderRadius: "1900px",
        display: "flex",
        justifyContent: "space-between",
        width: "8%",
        backgroundColor: "red",
        fontWeight: 'bolder'
    },
    root: {
        margin: 'auto',
        maxWidth: 350,
        maxHeight: 500,
        padding: 15,
        marginBottom: 20,
        display: 'inline-block',
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: '5%',
        marginTop: '2%'
    }
})

export const Home = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const donorCount = useSelector(state => state.donorProfile.count)

    useEffect(() => {
        dispatch(bloodCount()) //to get count of all blood groups
    }, [dispatch])

    return (
        <>
            <div>
                <Box>
                    <img alt="Blood donation" src="headerImg.jpg" style={{ width: "100%", height: "400px" }} />
                    <Typography variant="h4" sx={{ marginTop: "2%", color: "red" }}>Why should people donate blood ?</Typography>
                    <Typography variant="h6" sx={{ marginTop: "1%", marginRight: "3%" }}>Safe blood saves lives. Blood is needed by women with complications during pregnancy and childbirth, children with severe anaemia, often resulting from malaria or malnutrition, accident victims and surgical and cancer patients.

                        There is a constant need for a regular supply of blood because it can be stored only for a limited period of time before use. Regular blood donation by a sufficient number of healthy people is needed to ensure that blood will always be available whenever and wherever it is needed.

                        Blood is the most precious gift that anyone can give to another person – the gift of life. A decision to donate your blood can save a life, or even several if your blood is separated into its components – red cells, platelets and plasma – which can be used individually for patients with specific conditions.</Typography>

                    <img alt="Blood donation" src="compatibityChart.jpg" style={{ height: '380px', width: '50%' }} />
                    <iframe src="https://www.youtube.com/embed/rD-hypwum44" style={{ marginBottom: '10px', marginLeft: '0%', width: '40%', height: '340px' }} allow='autoplay'></iframe>

                    <Box sx={{ "background": "black", "width": "50%", "justifyContent": "center", "marginLeft": "25%" }}>
                        <Typography variant="h5" sx={{ "color": "white", "marginLeft": "29%" }}>Totally registered donors</Typography>
                        {donorCount && donorCount.map((count, index) => {
                            return (
                                <div key={index}>
                                    <div className={classes.todoStyle} >
                                        <Typography >{count._id} : {count.count}</Typography>
                                    </div>
                                </div>
                            )

                        })
                        }
                        <Tab sx={{ 'fontSize': '20px', 'fontWeight': 'bolder', 'color': 'white', 'marginLeft': '35%' }} LinkComponent={Link} to='/search' label="View Donors" />
                    </Box>
                </Box>
            </div>
            <hr></hr>
            <>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" fontWeight="bolder" backgroundColor='gray'>
                            A+
                        </Typography><hr></hr>
                        <Typography variant="body9" color="black" >
                            <ul>
                                <li>You can give blood to A+ and AB+</li>
                                <li>You can recieve blood from A+, A-, O+ and O-</li>
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>

                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" fontWeight="bolder" backgroundColor='gray'>
                            A-
                        </Typography><hr></hr>
                        <Typography variant="body9" color="black" >
                            <ul>
                                <li>You can give blood to A+, A-, AB- and AB+</li>
                                <li>You can recieve blood from A- and O-</li>
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>

                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" fontWeight="bolder" backgroundColor='gray'>
                            B+
                        </Typography><hr></hr>
                        <Typography variant="body9" color="black" >
                            <ul>
                                <li>You can give blood to B+ and AB+</li>
                                <li>You can recieve blood from B+, B-, O+ and O-</li>
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>

                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" fontWeight="bolder" backgroundColor='gray'>
                            B-
                        </Typography><hr></hr>
                        <Typography variant="body9" color="black" >
                            <ul>
                                <li>You can give blood to B+, B-, AB- and AB+</li>
                                <li>You can recieve blood from B- and O-</li>
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>

                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" fontWeight="bolder" backgroundColor='gray'>
                            AB+
                        </Typography><hr></hr>
                        <Typography variant="body9" color="black" >
                            <ul>
                                <li>People with AB+ can donate only to AB+ blood type</li>
                                <li>AB+ are <b>universal red cell recipients</b> because they can receive red cells from all types</li>
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>

                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" fontWeight="bolder" backgroundColor='gray'>
                            AB-
                        </Typography><hr></hr>
                        <Typography variant="body9" color="black" >
                            <ul>
                                <li>You can give blood to both AB+ and AB- blood types</li>
                                <li>Donors with AB+ and AB- blood are <b>universal plasma donors.</b> They can donate blood to all negative blood types.</li>
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>

                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" fontWeight="bolder" backgroundColor='gray'>
                            O+
                        </Typography><hr></hr>
                        <Typography variant="body9" color="black" >
                            <ul>
                                <li>O positive red blood cells are not universally compatible to all types, but they are <b>compatible to any red blood cells that are positive (A+, B+, O+, AB+).</b></li>
                                <li>You can receive blood only from O+ blood type.</li>
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>

                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" fontWeight="bolder" backgroundColor='gray'>
                            O-
                        </Typography><hr></hr>
                        <Typography variant="body9" color="black" >
                            <ul>
                                <li><b>Universal donors are those with an O negative blood type.</b>So they can donate to all blood types.</li>
                                <li>You can receive blood only from O- blood type.</li>
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>


            </>

        </>
    )
}
